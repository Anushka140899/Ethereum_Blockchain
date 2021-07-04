import React from 'react'
import Identicon from 'identicon.js'
import './Account.css'
import { span } from 'prelude-ls'

class Account extends React.Component{

    constructor(props)
    {
        super(props)
    }
    render() {

        return(
           <div className="Account-color"> 
            <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small>
                <h7 id="account">{this.props.account}</h7>
              </small>
  
              { this.props.account
                ? <img
                  className="ml-2"
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                  alt=""
                />
                : <span></span>
              }
  
            </li>
          </ul>
          </div>
        )
    }
}
export default Account;