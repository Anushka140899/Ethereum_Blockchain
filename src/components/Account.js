import React from 'react'
import './Account.css'

class Account extends React.Component{

    constructor(props)
    {
        super(props)
        {

        }
    }
    render() {

        return(
            <>
            <h5 className='Account-color'>Active Account: {this.props.account}</h5>
            </>
        )
    }
}
export default Account;