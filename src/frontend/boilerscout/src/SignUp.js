import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './SignUp.css'
import Logo from './Logo'

class SignUp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "ddd@purdue.edu",
      password: "Test1234!",
      repeatpassword: "Test1234!",
      fullname: "Jacob P Mieczni",
      major: "Antropology",
      redirect: false,
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);
    
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
      const _this = this;

      const payload = JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
      });

      fetch('http://localhost:8080/sign-up', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked',
        },
        body: payload
      }).then(function(response) {
        if (response.ok) {
          _this.setState({ redirect: true })
        } else {
          alert("count not work");
          console.log(response);
        }
      })
  }

  render () {
    return (
      <div className="SignUp">
        <Logo />
        <form onSubmit={this.handleSubmit}>
          <div className="Form">
          <FormGroup controlId="fullname" bsSize="large">
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
        {this.state.redirect && (
          <Redirect to={'/profile-created'}/>   
        )}
      </div>
    )
  }
}

export default SignUp;