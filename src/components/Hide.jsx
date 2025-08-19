import React from 'react'
import Navbar from './Navbar'

function Hide() {
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

               <div className="text-center mt-8 sm:mt-12 md:mt-16 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="text-white">Hide a </span>
            <span className="text-green-500">Secret Message</span>
          </h1>
        </div>
       <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-10 md:mt-14">
        <div className="relative mb-8">
          <div className="border-2 border-dashed border-green-500/60 rounded-xl p-6 sm:p-8 md:p-12 text-center bg-black/20 backdrop-blur-sm hover:border-green-400/80 transition-all duration-300 group">
            <div className="text-green-400 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              +
            </div>
            <p className="text-lg sm:text-xl text-gray-300 mb-2">Drop your image here</p>
            <p className="text-xs sm:text-sm text-gray-500">or click to browse</p>
            <div className="mt-3 sm:mt-4">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-600/30 hover:border-green-400 transition-all duration-300 text-sm sm:text-base">
                Choose File
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Your Secret Message</label>
          <textarea 
            className="w-full h-32 p-4 bg-black/40 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none font-mono text-sm"
            placeholder="Type your secret message here..."
          />
        </div>

        {/* Pswd */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-3">Your Key to Lock & Unlock</label>
            <div className="relative">
              <input 
                type="password"
                className="w-full p-4 bg-black/40 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 font-mono"
                placeholder="Enter your secret key..."
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300">
                👁️
              </button>
            </div>
          </div>
        </div>

                 {/*encrypt & hide btns*/}
         <div className="text-center mb-8">
           <button className="px-12 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-xl rounded-xl hover:scale-105 transition-all duration-300">
              Encrypt & Hide
           </button>
         </div>

        {/* Output Section(Initially hidden) */}
        <div className="hidden bg-black/30 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Your Hidden Message is Ready!</h3>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300">
               Download
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
              🔗 Share
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            All safe, all local — only your key reveals the truth.
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
  )
}

export default Hide