import axios from 'axios'
// seeting up a base url for all our requests and allowing cookies to be sent with each request
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
})

// Add token to all requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

export default api