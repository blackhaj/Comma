import React, { Component } from 'react';

export default class NavItem extends Component {
  render() {
    return (
      <div className='nav-item'>
        {this.props.name}
      </div>
    )
  }
}
