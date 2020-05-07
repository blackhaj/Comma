import React, { Component } from 'react'
import Title from './Title.jsx'
import AccountIcon from './AccountIcon.jsx'

export default class TitleBar extends Component {
  render() {
    return (
      <div className='title-bar'>
        <Title />
        <AccountIcon />
      </div>
    )
  }
}
