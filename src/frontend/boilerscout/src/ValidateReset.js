import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import logo from './logo.svg'

class ValidateReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: false,
      redirect: false,
    }

    this.sendGet(props.location.search);
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

  sendGet = (data) => {
    let url = "http://localhost:8080/validate-reset" + data;
    
    axios.get(url)
    .then(res => {
      if (res.status == 200) {
        this.setState({
          ...res.data,
          render: true,
        })
      } else {
        alert('Error Code:' + res.status + ". Try resetting again")
      }   
    })
    .catch((res) => {
      alert('Error. Try resetting again')
    });
  }

  componentDidUpdate = () => {
    console.log(this.state);
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
    const userId = this.state.userId;
    const hashedId = this.state.hashedId;
    const hashedEmail = this.state.hashedEmail;
    const newPassword = this.state.newPassword1;
    const confirmPassword = this.state.newPassword2;

    const payload = JSON.stringify({
      "userId": userId,
      "hashedId": hashedId,
      "hashedEmail": hashedEmail,
      "newPassword": newPassword,
      "confirmPassword": confirmPassword,
    });

    fetch('http://localhost:8080/reset-pass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      if (response.ok) {

        //redirect to page informing user that the updating password was successful
        _this.setState({
          redirect: true,
        })
      } else {
        alert("Error, Passwords do not match!")
      }
    })
    .catch((res) => {
      alert("Error:" + res)
    });
  }

  loadform = () => {
    if (this.state.render) {
      return (
        <div className="form">
          <form onSubmit={this.handleSubmit}>
        <div className="Form" >
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
        </div>
      )
    } else {
      return (<h2>Loading...</h2>)
    }
  }

  render() {
    return (
      <div className="ValidateReset">                
        <div className="Logo">
          <Link to="/">
            <img
                src={logo} 
                className="Home-logo" 
                alt="logo"                
            />
          </Link>
        </div>
        {this.loadform()}
        {this.state.redirect && <Redirect to="/password-updated-outside"/>}
      </div>
    );
  }
}

export default ValidateReset;