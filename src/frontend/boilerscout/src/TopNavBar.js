import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, Nav, NavItem } from "react-bootstrap";
import  './TopNavBar.css'
import logo from './logo.svg'

class TopNavBar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatpassword: "",
      redirect: false,
    };
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

  render () {
    const style = {
      width: "400px",
      margin: 0,
      padding: 0,
    }

    return (
      <div class="container">
      <div class="logo"> <img
              id="mylogo"
              src={logo} 
              alt="logo"
          /> 
      </div>
      <nav class="nav">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/profile">Profile</a>
        <a class="nav-link" href="/settings">Settings</a>
      </nav>
      <p></p>
      <hr/>
      </div>
    )
  }
}

export default TopNavBar;