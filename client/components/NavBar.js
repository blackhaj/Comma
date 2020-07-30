import React from 'react'
import { Link } from "react-router-dom";


export default function NavBar(props) {
  return (
    <nav className="navbar is-transparent">
    
      <div className="navbar-brand">
        <Link className="navbar-item" to='/'>
          COMMA
        </Link>
        <div className="navbar-burger burger" data-target="navbarBurger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <div id="navbarBurger" className="navbar-menu">
        <div className="navbar-start">
          <Link to='/' className="navbar-item" >Home</Link>
          { props.isUserLoggedIn ? <Link to='/accounts' className="navbar-item" >Accounts</Link> : <></> }
          {/* <Link to='/add' className="navbar-item" >Add</Link> */}
        </div>
        { props.isUserLoggedIn ? 
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to='/logout'>
                  <strong>Log Out</strong>
                </Link>
              </div>
            </div>
          </div>
          : <></>
        }
        
      </div>
    </nav>
  )
}
