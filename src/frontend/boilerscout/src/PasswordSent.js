import React, { Component } from "react";
import { Link } from 'react-router-dom'

class PasswordSent extends Component {
  render() {
    return (
      <div className="PasswordSent" class="Form">                
        <h1>Password Sent!</h1>
        <Link to="/">Return Home</Link>
      </div>
    );
  }
}

export default PasswordSent;