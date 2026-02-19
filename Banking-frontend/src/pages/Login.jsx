import React, { useState } from 'react'
import api from '../services/axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const [formData, setformData] = useState({
    email:'',
    password:''
  })
  const [loading,setloading] = useState(false)
  const [error,setError] = useState('')
  const onChange = (e) =>{
    setformData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    
    try{
      setloading(true)
      const datatosend={
      email:formData.email,
      password:formData.password
    }
    const response = await api.post('/auth/login',datatosend)
    localStorage.setItem('token',response.data.token)
    console.log(response.data.message)
    navigate('/')
  }catch(err){
      
      setError(err.response?.data?.message || 'Login failed')
      console.log(error)
  }finally{
    setloading(false)
  }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        {error && <div className="bg-red-900 border border-red-700 text-red-400 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <input 
              type='email' 
              name='email' 
              placeholder='Email' 
              value={formData.email} 
              onChange={onChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input 
              type='password' 
              name='password' 
              placeholder='Password' 
              value={formData.password} 
              onChange={onChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button 
            type='submit' 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 disabled:bg-gray-600 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login