import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './ForgotPassword.css'

class EditProfile extends Component {
  constructor() {
    super()

    this.state = {
      userid: null,
      bio: "HELLOOOO"
    }
  }

  // Return user id if signed in, null if not
  signedIn = () => {
    return this.state.signedIn
  }

  // handle auth, set userid
  handleAuth = (user) => {
    localStorage.setItem('userid', user.uid)

    this.setState(  
      {uid: user.uid}
    )
  }

  handleBioChange = () => {
    this.setState (
        {bio: "HIII",}
    )
  }
  // handle unauth, remove userid
  handleUnauth = () => {
    localStorage.removeItem('uid')
  }

  render() {
    return (
      <div className="EditProfile">
        <div className="Container">
          <button
            type="button">
            Edit Profile
        </button>
        <h4> Bio </h4>
        <p onClick={this.handleBioChange}>{this.state.bio} </p>
        </div>
      </div>
    )
  }
}

export default EditProfile;