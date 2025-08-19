import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
function Hero() {
 const navigate=useNavigate();
  const goToHide=()=>{
    navigate("/hide")
  }
  const goToReveal=()=>{
    navigate("/reveal")
  }
  return (
    <div className="min-h-screen w-full bg-[#101014] relative text-white -z-0 pt-px overflow-hidden ">
  
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
      backgroundSize: "80px 80px, 40px 40px, 60px 60px, 80px 80px, 100% 100%",
      backgroundPosition: "0 0, 0 0, 0 0, 40px 40px, center"
    }}
  />

<Navbar />

<div className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-12 sm:mt-16 md:mt-20 font-bold px-4">
  <span className='text-white'>Hide Secrets</span> <span className='text-green-600'>In Plain Sight !</span>
</div>

<div className='text-center text-base sm:text-lg md:text-[18px] mt-8 sm:mt-10 md:mt-14 text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4'>Encrypt any message and conceal it inside your favorite images.
Share the image, and only those who know the key can reveal the secret.</div>

<div className='flex flex-col sm:flex-row justify-center mt-8 sm:mt-10 md:mt-14 space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-10 px-4'>
  <button onClick={goToHide} className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border bg-black/40 border-gray-600 text-white text-center text-sm sm:text-base">
    Hide a Message
  </button>
  <button onClick={goToReveal} className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border bg-black/40 border-gray-600 text-white text-center text-sm sm:text-base">
    Reveal a Message
  </button>
</div>

<div className='text-center mt-8 sm:mt-10 md:mt-12 text-sm sm:text-base md:text-[18px] text-yellow-200 font-bold tracking-[0.2rem] sm:tracking-[0.25rem] md:tracking-[0.3rem] px-4'>Built on <span className='text-white'>ENCRYPTION</span> and <span className='text-green-600'>STEGANOGRAPHY</span> </div>

{/* 
<img
  src="/download.png"
  alt="Lock decorative"
  aria-hidden="true"
  className="absolute bottom-6 left-6 w-32 md:w-44 lg:w-60 opacity-30 -rotate-12 pointer-events-none select-none z-20 mix-blend-soft-light"
  style={{
    WebkitMaskImage: 'radial-gradient(circle at 60% 60%, black 60%, transparent 100%)',
    maskImage: 'radial-gradient(circle at 60% 60%, black 60%, transparent 100%)'
  }}
/> */}

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

export default Hero