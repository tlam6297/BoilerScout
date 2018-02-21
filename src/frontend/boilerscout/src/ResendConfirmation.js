import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class ResendConfirmation extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  render() {
    return (
      <div className="ResendConfirmation">
        <div className="Form">
          <FormGroup controlId="resendconfirm" bsSize="large">
            <ControlLabel>Email:</ControlLabel>
            <FormControl
              className="FormInput"
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Route render={({ history}) => (
            <button
              type='button'
              onClick={() => { history.push('/submit-resend') }}
            >
            SUBMIT
            </button>
          )} />
        </div>
      </div>
    );
  }

}

export default ResendConfirmation;