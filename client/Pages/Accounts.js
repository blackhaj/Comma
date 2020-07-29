import React, { Component } from 'react'
import AccountDisplay from '../components/AccountsDisplay'

export default class Accounts extends Component {

  state = {
    fetched: false,
    accounts: [],
  }

  componentDidMount(){
    this.getAccounts()
  }

  // request to get List of accounts for user
  getAccounts() {
    fetch('/api/overview/accountswithbalances')
      .then((response) => response.json())
      .then((payload) => {
        this.setState({
          fetched: true,
          accounts: payload.accounts,
        })
      })
      .catch((error) => console.error(error))
  }

  render() {
    const currentAccounts = []
    const savingsAccounts = []
    const investmentAccounts = []
    const totals = {
      current: 0,
      savings: 0,
      investment: 0
    }
    if (this.state.fetched) {
      
      this.state.accounts.forEach((account) => {
        switch (account.accountType) {
          case "current":
            totals.current += Number(account.latestBalance)
            currentAccounts.push(account)
            break;
          
          case "savings":
            totals.savings += Number(account.latestBalance)
            savingsAccounts.push(account)
            break;
        
          case "investment":
            totals.investment += Number(account.latestBalance)
            investmentAccounts.push(account)
            break; 

          default:
            break;
        }
      })
    }

    return (
      <div className="content" >
        { this.state.fetched ? 
          <>
            <AccountDisplay title='Current' accounts={currentAccounts} icon={"💳"} total={totals.current} />
            <AccountDisplay title='Savings' accounts={savingsAccounts} icon={"🐖"} total={totals.savings} />
            <AccountDisplay title='Investment' accounts={investmentAccounts} icon={"📈"} total={totals.investment} />
          </>
          : <h1>Loading Account Data</h1>
          }
      </div>
    )
  }
}
