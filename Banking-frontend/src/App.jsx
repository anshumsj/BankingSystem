import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Transfer from './pages/Transfer'
import CreateAccount from './pages/CreateAccount'
import ProtectedRoutes from './components/ProtectedRoutes'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>}/>


        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>


        <Route path='/create-account' element={
          <ProtectedRoutes>
            <CreateAccount/>
          </ProtectedRoutes>}/>
        <Route path='/transfer' element={
          <ProtectedRoutes>
            <Transfer/>
          </ProtectedRoutes>}/>
      </Routes>
    </div>
  )
}

export default App
