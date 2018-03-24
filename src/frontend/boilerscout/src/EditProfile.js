import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import ClickToEdit from 'react-click-to-edit'
class EditProfile extends Component {
  constructor() {
    super()

    this.state = {
      userid: null,
      old_bio: "HELLOOOO",
      new_bio: "",
      old_skills: "skills",
      old_skills: "",
      old_courses: "courses",
      new_courses: "",
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
        <div className="bio">
            <ClickToEdit
                endEditing={(value) => this.state.new_bio = value}
            >
                {this.state.old_bio}
            </ClickToEdit>
        </div>
        <h4> Courses </h4>
        <div className="courses">
            <ClickToEdit
                endEditing={(value) => this.state.new_courses = value}
            >
                {this.state.old_courses}
            </ClickToEdit>
            <h3> {this.state.new_courses} </h3>
        </div>
        <h4> Skills </h4>
        <div className="skills">
            <ClickToEdit
                endEditing={(value) => this.state.new_skills = value}
            >
                {this.state.old_skills}
            </ClickToEdit>
        </div>
        </div>
      </div>
    )
  }
}

export default EditProfile;