import React from 'react'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute'
import Home from './components/Home'
const App = () => {
  return <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path="/" element={<Register/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
      <Route element={<PrivateRoute/>}>
      <Route path="/home" element={<Home/>}></Route>
      </Route> 

  </Routes>
  </BrowserRouter>
  
  </>
}

export default App