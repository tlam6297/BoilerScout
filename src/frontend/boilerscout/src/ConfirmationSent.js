import React, { Component } from "react";
import Logo from './Logo'

class ConfirmationSent extends Component {
  render() {
    return (
      <div className="ConfirmationSent" class="Form">
        <Logo/>               
        <h1>You're almost there...</h1>
        <p>Check your email for the next steps on signing up</p>
      </div>
    );
  }
}

export default ConfirmationSent;