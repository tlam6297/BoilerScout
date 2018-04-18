import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Nav } from "react-bootstrap";
import NavBar from './TopNavBar'
import './Login.css'
import Logo from './Logo'

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false,
      DEBUGGING: false,
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);

    // Password must have 8 characters, include an uppercase letter, lowercase letter, one special character  and a number
    const password = this.state.password;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const validPassword = passwordregex.test(password);
    
    if (this.state.DEBUGGING){
      console.log("Password good?" + validPassword);
    }

    if (this.state.DEBUGGING) {
      console.log("Good email?: " + validEmail);
    }

    if (this.state.DEBUGGING) {
      return true;
    } else {
      //return (validEmail && validPassword);
      return true;
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/scout'/>
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
  }

  getLocalStorage = (key) => {
     return localStorage.getItem(key);
  }

  deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const _this = this;

    var payload = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password,
    });

    if (this.state.DEBUGGING) {
      payload = JSON.stringify({
        "email": "hgfdsdggfdfghgf@purdue.edu",
        "password": "Test1234!",
      });
    }

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      console.log(response)
      if (response.ok) {
        // redirect
        _this.setState({ redirect: true })
        console.log(response.data);
        response.json().then(json => {
          // Save to local storage
          _this.saveToLocalStorage("token", json.token);
          _this.saveToLocalStorage("id", json.userId);
        });

      } else {
        alert("Error: invalid username or password");
      }      
    })

  }

  render() {
    return (
      <div className="wrapper">
      <div className="Login">
        {this.renderRedirect()}
        <Logo/>
        <form onSubmit={this.handleSubmit}>
          <div className="Form">
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email:</ControlLabel>
              <br/>
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
              <br/>
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
              className="submitbutton"
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
        </div>
      </div>
    )
  }
}

export default Login;