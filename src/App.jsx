import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import How from './components/How'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Hero />}/>
        <Route path="/how" element={<How/>} />
     </ Routes>
    </Router>
  )
}

export default App
