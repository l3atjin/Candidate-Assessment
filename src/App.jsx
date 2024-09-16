import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to Candidate Assessment
      </h1>
      <button 
        onClick={() => navigate('/admin/sign-in')} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Admin login
      </button>
      <button 
        onClick={() => navigate('/candidate/sign-in')} 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Candidate login
      </button>
    </div>
  )
}

export default App
