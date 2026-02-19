import React, { useState } from 'react'
import api from '../services/axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(formData)
    try{
      setloading(true)
      const {confirmPassword,...dataTosend} = formData
      if(formData.password !== formData.confirmPassword){
        return
      }
      const response = await api.post('/auth/register',dataTosend)
      localStorage.setItem('token',response.data.token)
      console.log(response)
      setTimeout(()=>{navigate('/login')}, 1000)
    }catch(err){
      console.log(err)
      const status = err.response?.status
      if(status === 400){
        setTimeout(()=>{navigate('/login')}, 1000)
      }
      console.log('Error response:', err.response?.data)
    }finally{
      setloading(false)
    }
  }
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
        <form onSubmit={onSubmitHandler} className="space-y-4"> 
          <div>
            <input 
              name="name" 
              type="text" 
              placeholder='Full Name' 
              value={formData.name} 
              onChange={onChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input 
              name="email" 
              type="email" 
              placeholder='Email' 
              value={formData.email} 
              onChange={onChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input 
              name="password" 
              type="password" 
              placeholder='Password' 
              value={formData.password} 
              onChange={onChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input 
              name="confirmPassword" 
              type="password" 
              placeholder='Confirm Password' 
              value={formData.confirmPassword} 
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register