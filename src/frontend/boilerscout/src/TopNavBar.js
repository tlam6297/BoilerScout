import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, Nav, NavItem, MenuItem,  } from "react-bootstrap";

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
    return (
      <div className="navbar" class="navbar">
        <nav className="navbar navbar-default">
        
          <div className="link">
            <Link to="/">Home</Link>            
          </div>
          <div className="link left ">
            <Link to="/settings">Settings</Link>
          </div>
          <div className="link">
            <Link to="/profile">Profile</Link>
          </div>
          <div className="link">
            <Link to="/update-password">Update Password</Link>
          </div>            
        </nav>
      </div>
    )
  }
}

export default TopNavBar;