import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Logo from './Logo';

class Verify extends Component {
  constructor(props) {
    super(props)
    console.log("verify")
  }

  render() {
    return (
      <div className="Verify">
        <div className="logo">
          <Logo />
        </div>            
        <h1>verify</h1>
      </div>
    )
  }
}

export default Verify;