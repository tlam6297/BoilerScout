import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import logo from './logo.svg';

class Logo extends Component {

  render() {
    return (
        <div className="Logo">
        <Link to="/">
          <img
              src={logo} 
              className="Home-logo" 
              alt="logo"                
          />
        </Link>
      </div>
    );
  }
}

export default Buttons;