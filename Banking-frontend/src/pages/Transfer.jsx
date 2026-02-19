import React, { useState } from 'react'
import api from '../services/axios'
const Transfer = () => {
  const [formdata, setformData] = useState({
    fromAccount:'',
    toAccount:'',
    amount:'',
    indemPotencyKey:''
  })
  const [error, seterror] = useState('')
  
  const onChange = (e) => {
    setformData({
      ...formdata,
      [e.target.name]:e.target.value
    })
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log('Transfer:', formdata)
    const dataTosend = {
      fromAccount: formdata.fromAccount,
      toAccount: formdata.toAccount,
      amount: parseFloat(formdata.amount),
      indemPotencyKey: formdata.indemPotencyKey
    }
    try {
    const response = await api.post('transactions/transfer', dataTosend)
    console.log(response.data)
    seterror('')
  } catch (err) {
    console.log(err.response.data)
    seterror(err.response.data.message)
  }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-8 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-2xl border-2 border-gray-700">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white">Transfer Funds</h2>
          <p className="text-gray-400 mt-2 text-lg">Send money between accounts</p>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label className="block text-white mb-3 font-semibold text-lg">From Account</label>
            <input 
              type='text' 
              name='fromAccount' 
              placeholder='Enter sender account number' 
              className="w-full px-5 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              value={formdata.fromAccount}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-3 font-semibold text-lg">To Account</label>
            <input 
              type='text' 
              name='toAccount' 
              placeholder='Enter recipient account number' 
              className="w-full px-5 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              value={formdata.toAccount}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-3 font-semibold text-lg">Amount</label>
            <div className="relative">
              <span className="absolute left-5 top-4 text-gray-400 text-xl font-bold">$</span>
              <input 
                type='number' 
                name='amount' 
                placeholder='0.00' 
                className="w-full pl-12 pr-5 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xl" 
                value={formdata.amount}
                onChange={onChange}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className='mt-4'>
            <label className="block text-white mb-3 font-semibold text-lg">Indempotency Key</label>
            <input 
              type='text' 
              name='indemPotencyKey' 
              placeholder='Enter indemnity key' 
              className="w-full px-5 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              value={formdata.indemPotencyKey}
              onChange={onChange}
              required
            />
          </div>
          <button 
            type='submit' 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-4 rounded-lg transition-all duration-200 text-xl font-bold shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5"
          >
            {error ? error : "Complete Transfer"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Transfer