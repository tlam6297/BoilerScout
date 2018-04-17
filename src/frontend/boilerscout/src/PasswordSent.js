import React, { Component } from "react";
import { Link } from 'react-router-dom'

class PasswordSent extends Component {
  render() {
    return (
      <div className="PasswordSent" class="Form">                
        <h1>Password Sent!</h1>
        <p>Check your email for the next steps on updating your password</p>
      </div>
    );
  }
}

export default PasswordSent;