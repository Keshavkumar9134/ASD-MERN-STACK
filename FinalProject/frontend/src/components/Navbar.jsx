import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const h1=()=>{
        localStorage.removeItem('token')//after doing logout token remove from localstorage and can navigate to login
        navigate('/login');
    }

  return<>
  <nav>
    <Link to="/">Register</Link> | <Link to="/login">Login </Link>
    {token && 
    <>
      <Link to="/home">Main Page</Link>
      <button onClick={h1}>Loutout</button>
    </>}
  </nav>
  </>
}

export default Navbar