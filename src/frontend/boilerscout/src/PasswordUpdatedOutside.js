import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Logo from './Logo'

class PasswordUpdatedOutside extends Component {
  render() {
    return (
      <div className="PasswordUpdatedOutside" class="Form">
        < Logo/>           
        <h1>Password Updated!</h1>
        <Link to="/login">Return to Login</Link>
      </div>
    );
  }
}

export default PasswordUpdatedOutside;