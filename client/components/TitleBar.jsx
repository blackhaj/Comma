import React from 'react'
import Title from './Title.jsx'
import AccountIcon from './AccountIcon.jsx'

export default function TitleBar(props) {
  return (
    <div>
      <div className='title-bar'>
        <Title title={props.title} />
        <AccountIcon />
      </div>
    </div>
  )
}
