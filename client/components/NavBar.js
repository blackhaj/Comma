import React from 'react'

// onclick function to toggle is-active on .navbar-burger & .navbar-menu

export default function NavBar() {
  return (
    <nav class="navbar is-transparent">
    
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="#" alt="COMMA" width="112" height="28" />
        </a>
        <div class="navbar-burger burger" data-target="navbarBurger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <div id="navbarBurger" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="#">
            Home
          </a>
          <a class="navbar-item" href="#">
            Accounts
          </a>
          <a class="navbar-item" href="#">
            Add
          </a>
          <a class="navbar-item" href="#">
            History
          </a>

          
        </div>
    
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
