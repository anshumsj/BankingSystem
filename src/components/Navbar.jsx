import React from 'react'
import { Link } from 'react-router-dom'
import api from '../services/axios'
const Navbar = () => {
  const logoutHandler = () =>{
    try{
      localStorage.removeItem('token');
      api.post('/auth/logout')
    }catch(err){
      console.error("Logout error:", err);
    }
  }
  return (
    <nav className="bg-gray-900 shadow-xl border-b-2 border-gray-700">
      <div className="px-8">
        <div className="flex justify-between items-center py-4">
          <Link to='/' className="text-white text-2xl font-bold hover:text-blue-400 transition-colors duration-200">
            🏦 Banking System
          </Link>
          <div className="flex gap-3 items-center">
            <Link to='/' className="text-gray-300 hover:text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-200 text-lg font-medium border border-transparent hover:border-gray-700">Home</Link>
            <Link to='/login' className="text-gray-300 hover:text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-200 text-lg font-medium border border-transparent hover:border-gray-700">Login</Link>
            <Link to='/register' className="text-gray-300 hover:text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-200 text-lg font-medium border border-transparent hover:border-gray-700">Register</Link>
            <Link to='/create-account' className="text-gray-300 hover:text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-200 text-lg font-medium border border-transparent hover:border-gray-700">Create Account</Link>
            <Link to='/transfer' className="text-gray-300 hover:text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-200 text-lg font-medium border border-transparent hover:border-gray-700">Transfer</Link>
            <Link to='/login' className="text-gray-300 hover:text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-all duration-200 text-lg font-medium border border-transparent hover:border-gray-700" onClick={logoutHandler}>Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar