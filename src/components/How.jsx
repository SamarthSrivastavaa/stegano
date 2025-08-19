import React from 'react'
import Navbar from './Navbar'

function How() {
  return (
    <div className="min-h-screen w-full bg-[#101014] relative text-white -z-0 overflow-hidden">

    
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(45deg, rgba(0,255,128,0.09) 0, rgba(0,255,128,0.09) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(255,0,128,0.10) 0, rgba(255,0,128,0.10) 1px, transparent 1px, transparent 30px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px),
            radial-gradient(circle at 60% 40%, rgba(0,255,128,0.05) 0, transparent 60%)
          `,
          backgroundSize: '80px 80px, 40px 40px, 60px 60px, 80px 80px, 100% 100%',
          backgroundPosition: '0 0, 0 0, 0 0, 40px 40px, center'
        }}
      />

      <Navbar />

      <div className="absolute -left-32 top-40 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-28 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="text-center mt-12 md:mt-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-white">How it </span>
          <span className="text-green-500">Works</span>
        </h1>
        <div className="mt-4 text-sm md:text-base text-gray-400 tracking-widest">
          Share invisible secrets — locally, privately, beautifully
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 md:px-8 mt-10 md:mt-14">
        <div className="relative">

          <div className="absolute -left-2 top-2 bottom-2 w-px bg-gradient-to-b from-green-500/60 via-green-500/20 to-transparent" />

          <p className="text-[17px] md:text-[18px] leading-8 text-gray-300">
            This app lets you hide any secret message inside a regular image so that nobody can tell it’s there. First, you upload an image of your choice and type the message you want to protect. The text is <span className="text-white font-semibold">encrypted securely</span> in your browser, then concealed inside the <span className="text-green-400">pixel data</span> of your image — the picture looks exactly the same to the naked eye. Once the process is done, you can download the new <span className="text-green-500 font-semibold">stego image</span> and share it anywhere, just like any normal photo.
          </p>

          <p className="mt-6 text-[17px] md:text-[18px] leading-8 text-gray-300">
            When you or someone with the right key wants to read the hidden message, the image can be uploaded back into the app. The app will scan the pixels, extract and <span className="text-white font-semibold">decrypt</span> the secret, and then animate the reveal: the image softly fades away while the hidden text appears clearly on the screen.
          </p>

          <div className="mt-8 text-[15px] md:text-[16px] text-gray-400">
            Everything happens <span className="text-green-400">locally</span> in your browser — no files are stored, no servers involved — making it a simple but powerful way to share invisible secrets.
          </div>
        </div>

        <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 border border-green-900/40 text-xs text-gray-300 backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          Local-first • Encrypted • Steganography
        </div>
      </div>

      <footer className="w-full py-6 mt-16 text-center border-t border-green-900/40 bg-black/30">
        <p className="text-sm text-gray-400">
          Built on <span className="text-white">ENCRYPTION</span> and <span className="text-green-600">STEGANOGRAPHY</span>
        </p>
      </footer>
    </div>
  )
}

export default How



