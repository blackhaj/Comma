import React, { Component } from 'react';
import {withRouter} from 'react-router';
import TitleBar from '../TitleBar.jsx';
import Account from '../Account.jsx';

class Accounts extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  // componentDidMount(){
  //   fetch('/api/accounts')
  //   .then(response => response.json())
  //   .then(body => {
  //     this.setState({accounts: body})
  //   })
  // }

  render() {
    // let accountsList = []
    // this.state.accounts.forEach(element => {
    //   <Account accountType={element.accountType} name={element.accountName}/>
    // });
    return (
      <div>
        <TitleBar title={"Accounts"} />
      </div>
    )
  }
}

export default Accounts;