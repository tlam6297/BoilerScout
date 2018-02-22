import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);

    console.log("Good email?: " + validEmail);
    return (validEmail);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: true })
  }

  render() {
    return (
      <div className="ForgotPassword" class="fg">
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
        {this.state.redirect && (
          <Redirect to={'/confirmation-resent'}/>   
        )}
      </div>
    );
  }
}

export default ForgotPassword