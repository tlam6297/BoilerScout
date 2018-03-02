import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './SignUp.css'

class SignUp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatpassword: "",
      fullname: "",
      major: "",
      redirect: false,
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);
    console.log("Good email?: " + validEmail);
    
    const password = this.state.password;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const validPassword = passwordregex.test(password);

    const repeatpass = this.state.repeatpassword;
    const repeatPassword = (password == repeatpass);

    return (validEmail && validPassword && repeatPassword);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ redirect: true });  

      fetch('http://localhost:8080/sign-up', {
        method: 'POST',
        headers: {
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify ({
          'email': this.state.email,
          'password': this.state.password,
          'fullName': this.state.fullname,
          'major': this.state.major,
        })
      })
      .then(function(response) {
        alert(response.statusText);
      })
  }

  render () {
    return (
      <div className="SignUp">
        <form onSubmit={this.handleSubmit}>
          <div className="Form">
          <FormGroup controlId="name" bsSize="large">
              <ControlLabel>Full Name:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="text"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="major" bsSize="large">
              <ControlLabel>Major:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="text"
                value={this.state.major}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="name" bsSize="large">
              <ControlLabel>Full Name:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="text"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
            </FormGroup>
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
            <FormGroup controlId="repeatpassword" bsSize="large">
              <ControlLabel>Repeat Password:</ControlLabel>
                <FormControl
                  className="FormInput repeatPassword"
                  autoFocus
                  type="password"
                  value={this.state.repeatpassword}
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
        <Link to="/login">Already a member?</Link>
        <p></p>
        <Link to="/resend-confirmation">Resend Confirmation?</Link>
      </div>
    )
  }
}

export default SignUp;