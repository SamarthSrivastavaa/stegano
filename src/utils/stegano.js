// stegano.js - final fixed version
// Exports:
//   passwordToAesKey(password, salt?) -> CryptoKey
//   hideMessage(file, message, password) -> Promise<Blob> (PNG blob)
//   revealMessage(file, password) -> Promise<string>
//   revealMessageFromImageData(imageData, password) -> Promise<string>
// Debug helpers attached to window (optional).


// KEY DERIVATION 
export async function passwordToAesKey(password, salt = null) {
  const enc = new TextEncoder();
  const passBytes = enc.encode(password);

  if (salt && salt instanceof Uint8Array && salt.length > 0) {
    const baseKey = await crypto.subtle.importKey(
      "raw",
      passBytes,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const derived = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 150_000,
        hash: "SHA-256",
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    return derived;
  } else {
    const hash = await crypto.subtle.digest("SHA-256", passBytes);
    return await crypto.subtle.importKey(
      "raw",
      hash,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );
  }
}

//helpers bits-byts
function bytesToBits(u8) {
  const bits = new Uint8Array(u8.length * 8);
  let k = 0;
  for (let i = 0; i < u8.length; i++) {
    const byte = u8[i];
    for (let b = 7; b >= 0; b--) bits[k++] = (byte >> b) & 1; // MSB -> LSB
  }
  return bits;
}

function bitsToBytes(bits) {
  const len = Math.floor(bits.length / 8);
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    let v = 0;
    for (let b = 0; b < 8; b++) v = (v << 1) | bits[i * 8 + b];
    out[i] = v & 0xff;
  }
  return out;
}

// HEADER: structure   
// [MAGIC(4)]          
// [VER(1)]            
// [SALT(16)]          
// [IV(12)]            
// [CIPHERLEN(4 LE)]   


function buildHeader(cipherLen, iv, salt) {
  const MAGIC = new TextEncoder().encode("STEG"); // 4
  const version = 1; // 1
  const header = new Uint8Array(4 + 1 + 16 + 12 + 4); // 37
  header.set(MAGIC, 0);
  header[4] = version;
  header.set(salt, 5); // salt (16 bytes) at 5..20
  header.set(iv, 21);  // iv (12 bytes) at 21..32
  const lenBytes = new Uint8Array(4);
  new DataView(lenBytes.buffer).setUint32(0, cipherLen, true); //little endian
  header.set(lenBytes, 33); // 33..36
  return header;
}

function parseHeader(u8) {
  if (!(u8 instanceof Uint8Array)) throw new Error("parseHeader expects Uint8Array");

  const magic = new TextDecoder().decode(u8.slice(0, 4));
  if (magic !== "STEG") throw new Error("No hidden data found (bad magic)");
  const version = u8[4];
  if (version !== 1) throw new Error("Unsupported stego version");

  const salt = new Uint8Array(16);
  salt.set(u8.subarray(5, 21));
  const iv = new Uint8Array(12);
  iv.set(u8.subarray(21, 33));

  const cipherLen = new DataView(u8.buffer, u8.byteOffset + 33, 4).getUint32(0, true);

  if (!Number.isFinite(cipherLen) || cipherLen < 0 || cipherLen > 200_000_000) {
    throw new Error("Corrupted stego data (bad length)");
  }

  return { cipherLen, iv, salt, headerSize: 37 };
}


//img helper
async function imageDataFromFile(file) {
  const img = await createImageBitmap(file, { imageOrientation: 'none' });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  // Request opaque backing to reduce premultiplied alpha surprises
  const ctx = canvas.getContext("2d", { willReadFrequently: true, alpha: false });

  // Fill an opaque background (white) to ensure canvas is opaque
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return { canvas, ctx, imageData };
}

async function pngBlobFromImageData(canvas, ctx, imageData) {
  ctx.putImageData(imageData, 0, 0);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}


function hex(u8) {
  return Array.from(u8).map(b => b.toString(16).padStart(2,'0')).join(' ');
}

function byteDiff(expected, actual, maxShow = 64) {
  const len = Math.min(expected.length, actual.length);
  let mismatchCount = 0;
  const mismatches = [];
  for (let i = 0; i < len; i++) {
    if (expected[i] !== actual[i]) {
      mismatchCount++;
      if (mismatches.length < 12) mismatches.push({ idx: i, exp: expected[i], got: actual[i] });
    }
  }
  console.log(`byteDiff: compared ${len} bytes, mismatches=${mismatchCount}`);
  if (mismatches.length) {
    console.log("first mismatches:", mismatches.map(m => `${m.idx}: exp ${m.exp.toString(16).padStart(2,'0')} got ${m.got.toString(16).padStart(2,'0')}`));
  }
  console.log("expected head:", hex(expected.slice(0, maxShow)));
  console.log("actual head:  ", hex(actual.slice(0, maxShow)));
}

//exprt hidemssg

export async function hideMessage(file, message, password) {
  // generating a salt and derive the key
  const salt = crypto.getRandomValues(new Uint8Array(16));
  console.log("salt (hex):", hex(salt));

  const aesKey = await passwordToAesKey(password, salt);

  // iv
  const iv = crypto.getRandomValues(new Uint8Array(12));

  //encrypt plaintext (Textencoder to bytes)
  const encodedMsg = new TextEncoder().encode(message);
  const encryptedBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encodedMsg);
  const encryptedBytes = new Uint8Array(encryptedBuf); // these enc bytws contains ciphertext + 16 byte tag

  console.log("ENCRYPT SIDE:");
  console.log("  iv length:", iv.length);
  console.log("  ciphertext+tag length:", encryptedBytes.length);
  console.log("  header length will be:", (4+1+16+12+4));        // 37
  console.log("  total payload length:", encryptedBytes.length + (4+1+16+12+4));
  console.log("  header (hex):", hex(buildHeader(encryptedBytes.length, iv, salt)));
  console.log("  encrypted sample (hex first16):", hex(encryptedBytes.slice(0,16)));

  /*
  try {
    const ivCopy = new Uint8Array(iv);
    const ctCopy = new Uint8Array(encryptedBytes);
    const plainTest = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivCopy },
      aesKey,
      ctCopy
    );
    console.log("SELF-DECRYPT SUCCESS (sanity):", new TextDecoder().decode(new Uint8Array(plainTest)));
  } catch (e) {
    console.error("SELF-DECRYPT FAILED (this means encrypt/derive is broken):", e);
  }
  */

  // header and payloadddd
  const header = buildHeader(encryptedBytes.length, iv, salt);
  const payload = new Uint8Array(header.length + encryptedBytes.length);
  payload.set(header, 0);
  payload.set(encryptedBytes, header.length);

  try { window._lastPayload = payload; } catch(e){ /* ignore */ }

  // Get pixels nd capacity
  const { canvas, ctx, imageData } = await imageDataFromFile(file);
  const data = imageData.data; // RGBA
  const rgbChannels = Math.floor((data.length / 4) * 3); // number of RGB bytes
  const capacityBits = rgbChannels; // 1 bit per RGB byte
  const neededBits = payload.length * 8;

  if (neededBits > capacityBits) {
    throw new Error(
      `Message too long for this image. Need ${Math.ceil(neededBits / 8)} bytes capacity but only ~${Math.floor(capacityBits / 8)} available.`
    );
  }

  //Embed bits(sequential LSB,skip every 4th byte)
  const bits = bytesToBits(payload);
  let bitIndex = 0;
  for (let i = 0; i < data.length && bitIndex < bits.length; i++) {
    if ((i + 1) % 4 === 0) continue; // skip alpha channel
    data[i] = (data[i] & 0xfe) | bits[bitIndex++];
  }

  console.log("EMBED DONE:");
  console.log("  bits total:", bits.length, "bits");
  console.log("  bits written (should equal bits.length):", bitIndex);

  //Export png img
  const blob = await pngBlobFromImageData(canvas, ctx, imageData);
  return blob;
}

// EXPORT: revealMessage

export async function revealMessage(file, password) {
  const { canvas, ctx, imageData } = await imageDataFromFile(file);
  return revealMessageFromImageData(imageData, password);
}

// direct reveal from an ImageData
export async function revealMessageFromImageData(imageData, password) {
  const data = imageData.data;

  //Extractong ALL RGB LSBs intoA bit arrayyyy
  const bits = new Uint8Array(Math.floor((data.length / 4) * 3));
  let k = 0;
  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 4 === 0) continue; // skip alpha
    bits[k++] = data[i] & 1;
  }

  //Convert bits to bytes ,parsing the header
  const bytes = bitsToBytes(bits);

  console.log("REVEAL SIDE:");
  try {
    console.log("  MAGIC:", new TextDecoder().decode(bytes.slice(0,4)));
  } catch(e){ console.log("  MAGIC decode fail", e); }
  console.log("  raw header bytes (first 37 bytes hex):", hex(bytes.slice(0,37)));

  try {
    if (window._lastPayload) {
      byteDiff(window._lastPayload, bytes);
    }
  } catch(e){ /* nll */ }

  const { cipherLen, iv, salt, headerSize } = parseHeader(bytes);
  console.log("  parsed cipherLen:", cipherLen);
  console.log("  parsed iv (hex):", hex(iv));
  console.log("  parsed salt (hex, first8):", hex(salt.slice(0,8)));
  console.log("  headerSize:", headerSize, "total bytes len:", bytes.length);

  if (bytes.length < headerSize + cipherLen) throw new Error("Corrupted stego data (truncated)");
  const encryptedBytes = bytes.slice(headerSize, headerSize + cipherLen);

  if (iv.length !== 12) throw new Error("Bad IV length");
  if (encryptedBytes.length < 16) throw new Error("Ciphertext too short (no GCM tag?)");

  // 4) Recreate key with same salt
  const aesKey = await passwordToAesKey(password, salt);

//clean copies to avoid array buffers/view pitfalls
  const ivCopy = new Uint8Array(iv);                  //fresh copy of IV
  const ctCopy = new Uint8Array(encryptedBytes);      //fresh copy of ciphertext+tag

  // Decrypting the scrt
  try {
    console.log("  encryptedBytes length:", ctCopy.length, "sample first16:", hex(ctCopy.slice(0,16)));
    const plaintextBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivCopy }, // ivCopy is an ArrayBufferView (accepted)
      aesKey,
      ctCopy // Uint8Array (BufferSource) accepted by WebCrypto
    );
    const message = new TextDecoder().decode(new Uint8Array(plaintextBuf));
    console.log("Decrypted message:", message);
    return message;
  } catch (err) {
    console.error("AES-GCM decrypt failed (console):", err);
    console.log("IV (hex):", hex(ivCopy));
    console.log("CT len:", ctCopy.length, "CT sample:", hex(ctCopy.slice(0,16)));
    throw new Error("Failed to decrypt: wrong password or corrupted data (see console for details)");
  }
}

try {
  window.stegano_debug = { hex, byteDiff };
} catch(e){ /* ignore in strict contexts */ }