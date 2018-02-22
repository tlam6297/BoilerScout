import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatpassword: "",
      redirect: false,
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);
    console.log("Good email?: " + validEmail);
    
    // Password must have 8 characters, include an uppercase letter, lowercase letter, one special character  and a number
    const password = this.state.password;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const validPassword = passwordregex.test(password);
    console.log("Password good?" + validPassword);
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
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div className="Form">
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
            <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password:</ControlLabel>
              <FormControl
                className="FormInput Password"
                autoFocus
                type="password"
                value={this.state.password}
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
        
        <Link to="/sign-up">Not a member yet?</Link>
        <p></p>
        <Link to="/forgot-password">Forgot Password?</Link>
        <p></p>
        <Link to="/resend-confirmation">Resend Confirmation?</Link>
        <p></p>
        <Link to="/scout"> Scout</Link>
      </div>
    )
  }
}

export default Login;