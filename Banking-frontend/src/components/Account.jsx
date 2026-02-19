import React, { useState } from 'react'
import api from '../services/axios'
const Account = (props) => {
  // if(props.accounts.length === 0){
  //   return <h1>Accounts Loading.....</h1>
  // }
  const account = props.accounts;
  const [balances, setbalances] = useState([{}])
  const getBalance = async(ind) =>{
    const response = await api.get(`/accounts/getAccountBalance/${account[ind]._id}`)
    setbalances(prev=>({
      ...prev,[account[ind]._id]:response.data.balance
    }))
    console.log(response.data.balance)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {account.map((acc,index) => {
        return <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Account Details</h2>
          </div>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Account Number</p>
              <p className="text-white font-mono text-lg">{acc._id}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Currency</p>
                <p className="text-white font-semibold text-xl">{acc.currency}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Last Updated</p>
                <p className="text-gray-300">{new Date(acc.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div>
            <button 
              onClick={()=>{getBalance(index)}}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-lg transition-all duration-200 w-full text-lg font-semibold shadow-lg hover:shadow-blue-500/50"
            >
              Get Account Balance
            </button>
            {balances[acc._id] !== undefined && (
              <div className="mt-4 p-5 bg-gradient-to-r from-green-900 to-green-800 border-2 border-green-600 rounded-lg animate-pulse">
                <p className="text-sm text-green-300 mb-1">Current Balance</p>
                <p className="text-3xl font-bold text-green-400">
                  ${balances[acc._id]}
                </p>
              </div>
            )}
          </div>
        </div>
      })}
    </div>
  )
} 

export default Account