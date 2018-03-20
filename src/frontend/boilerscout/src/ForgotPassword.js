import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Login from "./Login"
import PasswordSent from './PasswordSent'
import "./ForgotPassword.css"

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      redirect: false,
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);
    
    return (validEmail);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const _this = this;

    fetch('http://localhost:8080/forgot-password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify ({
          'email': this.state.email,
        })
      })
      .then(function(response) {
        if (response.ok) {
          
          _this.setState({ redirect: true })
        } else {
          alert(response.statusText);
        }
      })
  }

  render() {
    return (
      <div className="ForgotPassword">
        <form onSubmit={this.handleSubmit}>
          <div className="Form" class="Form">
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
            <Button
              block
              bsSize="small"
              disabled={!this.validateForm()}
              type="submit">
              SUBMIT        
            </Button>
        </form>
        <Link to="/login">Return to Login</Link>
        {this.state.redirect && (
          <Redirect to={'/password-reset-sent'}/>   
        )}
      </div>
    );
  }
}

export default ForgotPassword