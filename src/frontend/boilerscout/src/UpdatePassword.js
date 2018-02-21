import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ForgotPassword.css"

class UpdatePassword extends Component {
  constructor() {
    super()

    this.state= {
      email: "",
    }
  }

  handleChange = (e) => {
    e.preventDefault();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return(
      <div className="UpdatePassword">
        <div className="Form" class="Form">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Enter your email:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup  bsSize="large">
              <ControlLabel>Enter old password:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.password1}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup  bsSize="large">
              <ControlLabel>Enter new password:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.newPassword1}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup  bsSize="large">
              <ControlLabel>Enter new password again:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.newPassword2}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              block
              bsSize="small"
              type="submit">
              Submit        
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default UpdatePassword;