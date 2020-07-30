import React, { Component } from 'react'
import AccountDisplay from '../components/AccountsDisplay'
import AccountCard from '../components/AccountCard'
import { Doughnut } from 'react-chartjs-2';

export default class Accounts extends Component {

  state = {
    fetched: false,
    accounts: [],
  }

  componentDidMount(){
    if (!this.state.fetched) {
      this.getAccounts()
    }
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

  generateAccountCard() {

  }

  render() {
    // Process fetched data by account type
    const currentAccounts = []
    const savingsAccounts = []
    const investmentAccounts = []
    const totals = {
      current: 0,
      savings: 0,
      investment: 0,
    }
    const interestRates = {}
    const assetAllocations = {
      shares: 0,
      bonds: 0,
      cash: 0,
    }

    const pieData = {
      datasets: [{
          data: [0, 0, 0],
          backgroundColor: ["#FFCD56","#36A2EB","#FF6384"],
          borderWidth: 0,
      }],
      labels: [
          'Stocks',
          'Bonds',
          'Cash'
      ]
    };

    let averageInterestRate;

    if (this.state.fetched) {
      // Create totals and add accounts to respective arrays
      this.state.accounts.forEach((account) => {
        switch (account.accountType) {
          case "current":
            totals.current += Number(account.latestBalance)
            currentAccounts.push(account)
            break;
          
          case "savings":
            let amount = Number(account.latestBalance)
            totals.savings += amount
            interestRates[account.interestRate] = (interestRates[account.interestRate] || 0) + amount
            savingsAccounts.push(account)
            break;
        
          case "investment":
            totals.investment += Number(account.latestBalance)
            assetAllocations[account.assetClass] += Number(account.latestBalance)
            investmentAccounts.push(account)
            break; 

          default:
            break;
        }

      })

      let totalInvs = totals.investment
      pieData.datasets[0].data = [
        (assetAllocations.shares / totalInvs).toFixed(2) * 100,
        (assetAllocations.bonds / totalInvs).toFixed(2) * 100,
        (assetAllocations.cash / totalInvs).toFixed(2) * 100
      ]

      averageInterestRate = Object.keys(interestRates).reduce((acc, key) => {
        acc = acc + Number(key) * interestRates[key] / totals.savings
        return acc;
      }, 0)
    }



    return (
      <div className="content" >
        { this.state.fetched ? 
          <>
            {/* Current Accounts Section */}
            { currentAccounts.length ?
              <div className={"stats-chapter"}>
                <h1>💳 Current Accounts</h1>
                You have £{totals.current.toFixed(2)} across your current accounts. You can see each of the accounts below.
                <div class="tile is-ancestor">
                  <div className={"accounts-list tile is-parent"}>
                    {currentAccounts.map((account) => (<AccountCard  key={`${account.accountName}${account.createdAt}`} name={account.accountName} total={Number(account.latestBalance).toFixed(2)} color={'is-info is-light'} accID={account.id} />) )}
                  </div>
                </div>
              </div>
              : <></>}

            {/* Savings Accounts Section */}
            { savingsAccounts.length ?
              <div className={"stats-chapter"}>
                <h1>🐖 Savings Accounts</h1>
                You have a total of £{totals.savings.toFixed(2)} across your savings accounts. You can see each of the accounts below and your average interest rate.
                <div class="tile">
                  <div className={"accounts-list tile  is-vertical is-8"}>
                    {savingsAccounts.map((account) => <AccountCard  key={`${account.accountName}${account.createdAt}`} name={account.accountName} total={Number(account.latestBalance).toFixed(2)} color={'is-info is-light'} accID={account.id}/> )}
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-warning">
                      <p class="title has-text-centered">Average Rate</p>
                      <p class="is-size-1 has-text-centered">{averageInterestRate.toFixed(2)}%</p>
                    </article>
                  </div>
                </div>
              </div>
              : <></>}

            {/* Investment Accounts Section */}
            { investmentAccounts.length ?
              <div className={"stats-chapter"}>
                <h1>📈 Investments</h1>
                You have £{totals.investment.toFixed(2)} across your investments. You can see each of the accounts below and an overall asset allocation to the left.
                <div class="tile">
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-primary">
                      <p class="title has-text-centered">Asset Allocation</p>
                      <Doughnut data={pieData} />
                    </article>
                  </div>
                  <div className={"accounts-list tile  is-vertical"}>
                    {investmentAccounts.map((account) => <AccountCard  key={`${account.accountName}${account.createdAt}`} name={account.accountName} total={Number(account.latestBalance).toFixed(2)} color={'is-info is-light'} accID={account.id}/> )}
                  </div>
                  
                </div>
              </div>
              : <></>}
          </>

          : <h1>Loading Account Data</h1>
          }
      </div>
    )
  }
}
