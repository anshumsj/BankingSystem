import React, { useState } from 'react'
import api from '../services/axios'

const CreateAccount = () => {
  const [accountData, setAccountData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createAccount = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post('/accounts/create-account')
      console.log(response.data)
      setAccountData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setAccountData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {!accountData ? (
          // Create Account Button Section
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400">Start your banking journey</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={createAccount}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Your account will be created with INR currency
            </p>
          </div>
        ) : (
          // Success Display Section
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-500/20 rounded-full p-3">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Success!</h2>
              <p className="text-green-300">{accountData.message}</p>
            </div>

            {/* Account Details Card */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Account Details</h3>
              
              <div className="space-y-4">
                {/* Account ID */}
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-medium mb-1">Account ID</p>
                  <p className="text-white font-mono text-sm break-all">{accountData.account._id}</p>
                </div>

                {/* Currency */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm font-medium mb-1">Currency</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">₹</span>
                      <p className="text-white font-bold">{accountData.account.currency}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm font-medium mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                      <p className="text-white font-bold capitalize">{accountData.account.status}</p>
                    </div>
                  </div>
                </div>

              

                {/* Created & Updated Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm font-medium mb-1">Created At</p>
                    <p className="text-white text-sm">{new Date(accountData.account.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-500 text-xs">{new Date(accountData.account.createdAt).toLocaleTimeString()}</p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm font-medium mb-1">Updated At</p>
                    <p className="text-white text-sm">{new Date(accountData.account.updatedAt).toLocaleDateString()}</p>
                    <p className="text-gray-500 text-xs">{new Date(accountData.account.updatedAt).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* User Reference */}
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-medium mb-1">User ID</p>
                  <p className="text-white font-mono text-sm break-all">{accountData.account.user}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCreateNew}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                Create Another
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateAccount