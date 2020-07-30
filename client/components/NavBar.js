import React from 'react'
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <nav className="navbar is-transparent">
    
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img src="#" alt="COMMA" width="112" height="28" />
        </a>
        <div className="navbar-burger burger" data-target="navbarBurger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <div id="navbarBurger" className="navbar-menu">
        <div className="navbar-start">
          <Link to='/' className="navbar-item" >Home</Link>
          <Link to='/accounts' className="navbar-item" >Accounts</Link>
          {/* <Link to='/add' className="navbar-item" >Add</Link> */}
        </div>
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
