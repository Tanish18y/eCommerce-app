import { NavLink } from 'react-router-dom'
import React from 'react'
let NavBar=()=> {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-style">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/dashboard">Dashboard <span class="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Login</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink className="nav-link " to="/register" >
          Register
        </NavLink>
        
      </li>
      
    </ul>
    
  </div>
</nav>
    </div>
  )
}

export default NavBar