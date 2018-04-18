import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./UpdatePassword.css"
import Nav from './TopNavBar'
import axios from 'axios'

class UpdatePassword extends Component {
  constructor(props) {
    super(props)

    this.state= {
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
      redirect: false,
    }
  }

  validateForm = () => {    
    // Password must have 8 characters, include an uppercase letter, lowercase letter, one special character  and a number
    const oldPassword = this.state.oldPassword;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const validOldPassword = passwordregex.test(oldPassword);

    const newPassword1 = this.state.newPassword1;
    const newPassword2 = this.state.newPassword2;

    const validNewPassword = passwordregex.test(newPassword1);

    const passwordsMatch = (newPassword1 == newPassword2);

    console.log(validNewPassword);

    return (passwordsMatch && validNewPassword);
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const _this = this;

    //send post
    const id = this.getLocalStorage("id");
    const token = this.getLocalStorage("token");

    const oldPass = this.state.oldPassword;
    const newPass1 = this.state.newPassword1;
    const newPass2 = this.state.newPassword2;

    const payload = JSON.stringify({
      "userId": id,
      "token": token,
      "currentPassword": oldPass,
      "newPassword": newPass1,
      "confirmPassword": newPass2
    });

    fetch('http://localhost:8080/update-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      console.log(response);   
      if (response.ok) {
        _this.setState({ redirect: true })
      } else {
        alert("Error, old password is not correct")
      } 
    })



  }

  componentWillMount = () => {
    console.log("Checking if valid token...")
    axios.get("http://localhost:8080/verify-authentication?" + "userId=" + localStorage.getItem("id") + "&token=" + localStorage.getItem("token"))
  
    .then(res => {
      if (res.data == false) {
        console.log("Not valid token")
        this.setState({
          redirect1: true,
        })
      } else {
        console.log("Valid Token")
        this.setState({
          redirect1: false,
        })
      }
    })
  }

  rednerRedirect = () => {
    if (this.state.redirect1) {
      this.setState({
        redirect1: false,
      })
      return (<Redirect to="/" />)
    }
  }

  render() {
    return(
      <div>
        {this.rednerRedirect()}
        <Nav />
        <div className="UpdatePassword">      
        <form onSubmit={this.handleSubmit}>
          <div className="Form" >
              <FormGroup controlId="oldPassword" bsSize="large">
                <ControlLabel>Enter old password:</ControlLabel>
                <FormControl
                  className="FormInput Password"
                  autoFocus
                  type="password"
                  value={this.state.oldPassword}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="newPassword1" bsSize="large">
                <ControlLabel>Enter new password:</ControlLabel>
                <FormControl
                  className="FormInput Password"
                  autoFocus
                  type="password"
                  value={this.state.newPassword1}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="newPassword2" bsSize="large">
                <ControlLabel>Enter new password again:</ControlLabel>
                <FormControl
                  className="FormInput Password"
                  autoFocus
                  type="password"
                  value={this.state.newPassword2}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                block
                bsSize="small"
                disabled={!this.validateForm()}
                type="submit">
                SUBMIT        
              </Button>
          </div>
            </form>
            {this.state.redirect && (
              <Redirect to={'/password-updated'}/>   
            )}
        </div>
      </div>
    )
  }
}

export default UpdatePassword;