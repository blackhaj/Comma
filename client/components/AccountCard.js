import React from 'react'

export default function AccountCard(props) {
  console.log('COLOR', props.color)
  return (
    <article className={`tile is-child notification ${props.color}`}>
      <p className={"title"}>{props.name}</p>
      <p className={"subtitle"}>£{props.total}</p>
    </article>
  )
}
