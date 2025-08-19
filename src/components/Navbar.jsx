import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
   const navigate = useNavigate()
   const location = useLocation()
   
   const goHome = () => {
    navigate("/")
   }
   
   const goToHow = () => {
    navigate("/how");
  };
  
  const isHomePage = location.pathname === "/";
  
  return (
    <div className='bg-black flex justify-between p-3 sm:p-4 md:p-5 rounded-xl border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.7)] max-w-4xl mx-auto mt-4 sm:mt-6 z-10'>
      <div onClick={goHome} className='ml-2 sm:ml-4 md:ml-6 text-white cursor-pointer hover:text-gray-300 transition-colors'>
        <span className="text-lg sm:text-xl md:text-2xl text-yellow-200 tracking-[0.2rem] sm:tracking-[0.3rem] md:tracking-[0.4rem]">C</span>
        <span className="text-lg sm:text-xl md:text-2xl tracking-[0.2rem] sm:tracking-[0.3rem] md:tracking-[0.4rem]">ryptic</span>
      </div>
      <button 
        onClick={isHomePage ? goToHow : goHome} 
        className="bg-green-600 rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 shadow-[0_0_20px_rgba(0,0,0,0)] hover:bg-green-700 transition-colors text-xs sm:text-sm md:text-base"
      >
        <span className="text-white font-bold">
          {isHomePage ? "How it Works" : "Back to Home"}
        </span>
      </button>
    </div>
  )
}

export default Navbar
