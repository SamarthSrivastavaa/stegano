import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const navigate=useNavigate()
 const goToHow = () => {
    navigate("/how");
  };
  return (
    <div className='bg-black flex justify-between p-5 rounded-xl border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.7)] max-w-4xl mx-auto mt-6 z-10'>
      <div className='ml-6 text-white'>
        <span className="text-2xl text-yellow-200 tracking-[0.4rem]">C</span>
        <span className="text-2xl tracking-[0.4rem]">ryptic</span>
      </div>
      {/* <div className='text-white text-2xl' >FAQ</div> */}
      <button onClick={goToHow} className="bg-green-600 rounded-full px-6 py-2 shadow-[0_0_20px_rgba(0,0,0,0)]">
        <span className="text-white font-bold">How it Works</span>
        </button>
    </div>
  )
}

export default Navbar
