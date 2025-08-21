// import React from 'react'
// import Navbar from './Navbar'
// function Reveal() {
    
//   return (
//     <div className="min-h-screen w-full bg-[#101014] relative text-white -z-0 overflow-hidden">
//     <div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         backgroundImage: `
//           repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px),
//           repeating-linear-gradient(45deg, rgba(0,255,128,0.09) 0, rgba(0,255,128,0.09) 1px, transparent 1px, transparent 20px),
//           repeating-linear-gradient(-45deg, rgba(255,0,128,0.10) 0, rgba(255,0,128,0.10) 1px, transparent 1px, transparent 30px),
//           repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px),
//           radial-gradient(circle at 60% 40%, rgba(0,255,128,0.05) 0, transparent 60%)
//         `,
//         backgroundSize: '80px 80px, 40px 40px, 60px 60px, 80px 80px, 100% 100%',
//         backgroundPosition: '0 0, 0 0, 0 0, 40px 40px, center'
//       }}
//     />

//     <Navbar />

//     <div className="text-center mt-8 sm:mt-12 md:mt-16 px-4">
//       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
//         <span className="text-white">Reveal the </span>
//         <span className="text-green-500">Hidden Truth</span>
//       </h1>
//     </div>

//     <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-10 md:mt-14">
      
//       <div className="relative mb-8">
//         <div className="border-2 border-dashed border-green-500/60 rounded-xl p-6 sm:p-8 md:p-12 text-center bg-black/20 backdrop-blur-sm hover:border-green-400/80 transition-all duration-300 group">
//           <div className="text-green-400 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
//             🔍
//           </div>
//           <p className="text-lg sm:text-xl text-gray-300 mb-2">Drop the image here</p>
//           <p className="text-xs sm:text-sm text-gray-500">or click to browse</p>
//           <div className="mt-3 sm:mt-4">
//             <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-600/30 hover:border-green-400 transition-all duration-300 text-sm sm:text-base">
//               Choose File
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-8">
//         <label className="block text-sm font-medium text-gray-300 mb-3">Your Secret Key</label>
//         <div className="relative">
//           <input 
//             type="password"
//             className="w-full p-4 bg-black/40 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 font-mono"
//             placeholder="Enter the key that unlocks the truth..."
//           />
//           <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300">
//             👁️
//           </button>
//         </div>
//         <p className="text-xs text-gray-500 mt-2 italic">Only the right key can unlock what's inside</p>
//       </div>

//       {/* Reveal Mssg Button */}
//       <div className="text-center mb-8">
//         <button className="px-12 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-xl rounded-xl hover:scale-105 transition-all duration-300">
//           Reveal Message
//         </button>
//       </div>

//       {/* Img prvw (Initially Hidden) */}
//       <div className="hidden mb-6">
//         <div className="relative">
//           <img 
//             src="/placeholder-image.jpg" 
//             alt="Uploaded image" 
//             className="w-full max-w-md mx-auto rounded-lg border border-green-500/30 opacity-80 transition-opacity duration-500"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none" />
//         </div>
//       </div>

//       {/* Decrypted mssg Ovrlay (Initially Hidden) */}
//       <div className="hidden bg-black/40 border border-green-500/40 rounded-xl p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)]">
//         <h3 className="text-2xl font-bold text-green-400 mb-4 text-center"> Message Revealed!</h3>
//         <div className="bg-black/60 border border-green-500/30 rounded-lg p-6">
//           <p className="text-lg text-gray-200 font-mono leading-relaxed">
//             Your decrypted message will appear here, pulled straight out of the shadows...
//           </p>
//         </div>
//       </div>

//       {/* Bottom Note */}
//       <div className="text-center mt-8">
//         <p className="text-sm text-gray-500 italic">
//           No tricks, no servers — just you, your key, and the truth inside the pixels.
//         </p>
//       </div>
//     </div>

//     <footer className="w-full py-6 mt-16 text-center border-t border-green-900/40 bg-black/30">
//       <p className="text-sm text-gray-400">
//         Made by{" "}
//         <a
//           href="https://x.com/SamarthS_1101" 
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-green-400 hover:text-green-300 transition duration-300 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"
//         >
//           Samarth Srivastava
//         </a>
//       </p>
//     </footer>
//   </div>
//   )
// }

// export default Reveal
import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import { revealMessage } from "../utils/stegano"; // import your reveal util

function Reveal() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
      setDecryptedMessage(null);
      setError(null);
    }
  };

  const handleClearFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // reveal button
  const handleReveal = async () => {
    if (!file || !password) {
      setError("Please upload an image and enter your password.");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      // console.log("test working")
      const msg = await revealMessage(file, password);
      console.log(msg);  //isnt rn
      setDecryptedMessage(msg);
    } catch (err) {
      console.error(err);
      setError("Failed to decrypt. Wrong password or corrupted file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#101014] relative text-white overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(45deg, rgba(0,255,128,0.09) 0, rgba(0,255,128,0.09) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(255,0,128,0.10) 0, rgba(255,0,128,0.10) 1px, transparent 1px, transparent 30px),
            radial-gradient(circle at 60% 40%, rgba(0,255,128,0.05) 0, transparent 60%)
          `,
          backgroundSize: "80px 80px, 40px 40px, 60px 60px, 100% 100%",
        }}
      />
      <Navbar />

      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
          <span className="text-white">Reveal the </span>
          <span className="text-green-500">Hidden Truth</span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* File Upload */}
        <div className="relative mb-8">
          <label
            htmlFor="file-upload"
            className="cursor-pointer border-2 border-dashed border-green-500/60 rounded-xl p-10 text-center bg-black/20 backdrop-blur-sm hover:border-green-400/80 transition-all duration-300 block relative overflow-hidden"
          >
            {!previewUrl && (
              <>
                <div className="text-green-400 text-5xl mb-4">🔍</div>
                <p className="text-lg text-gray-300 mb-2">
                  {file ? file.name : "Drop your stego image here"}
                </p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </>
            )}
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Selected stego image"
                  className="w-full max-h-72 mx-auto rounded-lg object-contain border border-green-500/30"
                />
                <button
                  onClick={handleClearFile}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                  aria-label="Clear selected image"
                >
                  ×
                </button>
              </div>
            )}
          </label>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Psswd input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Your Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-black/40 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 font-mono"
              placeholder="Enter your password..."
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            Only the correct password can unlock the message.
          </p>
        </div>

        {/* Reveal */}
        <div className="text-center mb-8">
          <button
            onClick={handleReveal}
            disabled={loading}
            className="px-12 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-xl rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Decrypting..." : "Reveal Message"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 text-center text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* Image Preview moved inside the upload box above */}

        {/* Decrypted Message */}
        {decryptedMessage && (
          <div className="bg-black/40 border border-green-500/40 rounded-xl p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">
              Message Revealed!
            </h3>
            <div className="bg-black/60 border border-green-500/30 rounded-lg p-6">
              <p className="text-lg text-gray-200 font-mono leading-relaxed whitespace-pre-wrap">
                {decryptedMessage}
              </p>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            No servers. No traces. Just you, your password, and the truth.
          </p>
        </div>
      </div>

      <footer className="w-full py-6 mt-16 text-center border-t border-green-900/40 bg-black/30">
        <p className="text-sm text-gray-400">
          Made by{" "}
          <a
            href="https://x.com/SamarthS_1101"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition duration-300 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"
          >
            Samarth Srivastava
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Reveal;
