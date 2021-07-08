import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import AsToken from '../abis/AsToken.json'
import EthSwap from '../abis/EthSwap.json'
import Navbar from './Navbar'
import Main from './Main'
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

    //Load Token
    const networkId = await web3.eth.net.getId()
    const TokenData= AsToken.networks[networkId]
    if(TokenData)
    {
      const token = new web3.eth.Contract(AsToken.abi,TokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      console.log("TokenBalance: " ,tokenBalance.toString())
      this.setState({ tokenBalance : tokenBalance.toString() })
    }
    else
    {
      window.alert('Token contract is not deployed on the current network')
    }

    const EthswapData= EthSwap.networks[networkId]
    if(EthswapData)
    {
      const ethSwap = new web3.eth.Contract(EthSwap.abi,EthswapData.address)
      this.setState({ ethSwap })
    }
    else
    {
      window.alert('Token contract is not deployed on the current network')
    }

    this.setState({ loading:false })
   
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
      token:{},
      ethSwap:{},
      ethBalance : '0',
      tokenBalance:'0',
      provider:'',
      loading:true
    }
  }
  render() {
    let content
    if(this.state.loading)
    {
      content=<p id='loader' className='text-center'>Loading.....</p>
    }
    else
    {
      content=<Main/>
    }
    return (
      <div>
      <Router>
       <Navbar/>
       <Switch>
         <Route path='/' exact/>
       </Switch>
       </Router>
       <Account account={this.state.account}></Account>
       {content}
       
      </div>
    );
  }
}

export default App;