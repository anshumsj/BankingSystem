import React, { useEffect, useState } from 'react'
import api from '../services/axios'
import Account from '../components/Account'
const Home = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchAccounts = async () => {
        try{
            const response = await api.get('/accounts/getAllAccounts')
            setAccounts(response.data.accounts)
        }catch(err){
            console.log(err.response?.data?.message || 'Error fetching accounts')        }
            finally{
              setLoading(false)
            }
    }
    fetchAccounts()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-10 px-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-2xl text-gray-400">Loading Accounts...</h1>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">Welcome to the Banking System</h1>
          <p className="text-gray-400 text-lg mb-8">Manage your accounts and transactions</p>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-xl shadow-2xl border border-blue-500 mb-10">
            <h2 className="text-2xl font-semibold text-white mb-2">User ID</h2>
            <p className="text-blue-100 text-lg font-mono mb-4">{accounts[0]?.user}</p>
            <div className="flex items-center gap-2">
              <span className="text-white text-lg font-medium">Total Accounts:</span>
              <span className="bg-white text-blue-700 px-4 py-1 rounded-full font-bold text-lg">{accounts.length}</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Accounts</h2>
            <Account accounts={accounts} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home