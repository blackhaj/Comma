import React, { Component } from 'react'
import NavItem from './NavItem.jsx';

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar-container'>
        <NavItem name='Home' />
        <NavItem name='Accounts' />
        <NavItem name='Add' />
        <NavItem name='Stats' />
        <NavItem name='History' />
      </div>
    )
  }
}
