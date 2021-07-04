import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';



class Navbar extends React.Component{
    constructor(props)
    {
        super(props);
    }

    state = {clicked:false}

    handleClick=()=>{
        this.setState({clicked:!this.state.clicked})
    }

    closeMobileMenu=()=>{
        this.setState({clicked:false})
    }

    render(){
        
      
    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
            <Link to='/' className='navbar-logo'>
             EthSwap <i className="fab fa-typo3"></i>
            </Link>
            
             
            </div>
        </nav>
        </>
    )
  }
}

export default Navbar
