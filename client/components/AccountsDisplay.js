import React from 'react'
import AccountCard from './AccountCard'

// Receive Title, array of accounts, icon 
// Displays section title
// Displays account cards



export default function AccountsDisplay(props) {
  const colorsArray = ['is-warning', 'is-primary', 'is-info', 'is-warning', 'is-danger']
  return (
    <>
      { props.accounts.length ?
        <div className={"content"}>
          <h1>{props.icon} {props.title} Accounts</h1>
          You have £{props.total.toFixed(2)} across your {props.title.toLowerCase()} accounts. You can see each of the accounts below.
          <div class="tile">
            <div className={"accounts-list tile is-parent is-vertical is-8"}>
              {props.accounts.map((account) => <AccountCard  key={`${account.accountName}${account.createdAt}`} name={account.accountName} total={Number(account.latestBalance).toFixed(2)} color={colorsArray[Math.floor(Math.random() * colorsArray.length) ]} /> )}
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-info">
                <p class="title">Middle tile</p>
                <p class="subtitle">With an image</p>
              </article>
            </div>
          </div>
        </div>
        : <></>
      }
    </>
  )
}
