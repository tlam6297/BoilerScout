import React, { Component } from "react";
import { Link } from 'react-router-dom'

class ProfileCreated extends Component {
  render() {
    return (
      <div className="ProfileCreated">                
        <h1>Profile Created!</h1>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }
}

export default ProfileCreated;