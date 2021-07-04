import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar'
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Account from './Account'


class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchain()
  }

  async loadBlockchain()
  {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account : accounts[0]})
    console.log(this.state.account)

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance})
    console.log(this.state.ethBalance)
  }
  async loadWeb3()
  {
    if(window.ethereum)
    {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3)
    {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else
    {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor(props)
  {
    super(props)
    this.state= {
      account : '',
      ethBalance : '0'
    }
  }
  render() {
    return (
      <>
      <Router>
       <Navbar account={this.state.account}/>
       <Switch>
         <Route path='/' exact />
       </Switch>
       </Router>
       <Account account={this.state.account}></Account>
      </>
    );
  }
}

export default App;