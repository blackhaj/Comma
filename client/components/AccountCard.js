import React from 'react'
import { Link } from "react-router-dom";

export default function AccountCard(props) {
  
  const linkConfig = {
    pathname: `/accounts/${props.name}`, 
    accountID: props.accID,
    accountName: props.name,
  }

  return (
    
      <div className="tile is-parent">
        <article className={`tile is-child notification ${props.color}`}>
          <Link to={linkConfig} className={'no-underline'} style={{"textDecoration": "none"}} >
            <p className={"title is-size-5"}>{props.name}</p>
          </Link>
          <p className={"subtitle is-size-6"}>£{props.total}</p>
        </article>
      </div>
  )
}
