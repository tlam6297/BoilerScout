import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, Nav, NavItem } from "react-bootstrap";
import './Logout.css'
import Logo from './Logo'

class Logout extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loggedout: false,
    };
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
 }

  componentWillMount = (props) => {
    const _this = this;

    const payload = JSON.stringify({
      "userId": this.getLocalStorage("id"),
      "token": this.getLocalStorage("token"),
    });

    fetch('http://localhost:8080/logout', {
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
        _this.setState({ loggedout: true })
        localStorage.clear();

      } else {
        alert("Error: invalid username or password");
      }      
    })
  }

  displayMessage = () => {
    if (this.state.loggedout) {
      return (
        <div className="success">
          <h2>Logout successful!</h2>
          <Link to="/"> Return Home</Link>
        </div>
      )
    } else {
      return (
        <h2>Logging out...</h2>
      )
    }
  }

  render =() => {
    return (
      <div>
        <div className="logo">
          <Logo />
        </div>
        <div className="message">
          {this.displayMessage()}
        </div>
      </div>
    )
  }
}

export default Logout;