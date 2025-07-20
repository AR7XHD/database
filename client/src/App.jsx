import { useState } from 'react'
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import './App.css'

function App() {

  return (
    <>
      <div className="absolute inset-0 -z-10 h-[200vh] w-full bg-gradient-to-br from-black via-gray-900 to-green-900"></div>
      <Navbar />
      <Manager />

    </>
  )
}

export default App
