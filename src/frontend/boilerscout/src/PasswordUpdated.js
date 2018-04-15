import React, { Component } from "react";
import { Link } from 'react-router-dom'

class PasswordUpdated extends Component {
  render() {
    return (
      <div className="PasswordUpdated" class="Form">                
        <h1>Password Updated!</h1>
        <Link to="/login">Back to Login</Link>
      </div>
    );
  }
}

export default PasswordUpdated;