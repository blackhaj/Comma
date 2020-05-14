import React, { Component } from 'react';
import NavItem from './NavItem.jsx';
import { Link } from 'react-router-dom';
const add = require('../assets/icons/add.png');


export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar-container'>
        <Link className='nav-item' to='/'>🏠</Link>
        <Link className='nav-item' to='/accounts'>👜</Link>
        <Link className='nav-item' to='/add'>➕</Link>
        <Link className='nav-item' to='/stats'>📈</Link>
        <Link className='nav-item' to='/history'>⏰</Link>
      </div>
    )
  }
}
