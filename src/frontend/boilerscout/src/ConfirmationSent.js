import React, { Component } from "react";
import Logo from './Logo'
import './ConfirmationSent.css'

class ConfirmationSent extends Component {
  render() {
    return (
      <div className="ConfirmationSent" class="Form">
        <Logo/>               
        <h1>You're almost there...</h1>
        <p id="confirmationsent">Check your email to finish signing up!</p>
      </div>
    );
  }
}

export default ConfirmationSent;