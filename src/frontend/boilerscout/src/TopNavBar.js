import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, Nav, NavItem } from "react-bootstrap";
import './NavBar.css'

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
      <div className="navbar" class="navbar" style={style}>
        <nav className="navbar navbar-default">
            <form className="navbar-form navbar-left">
             <Link to="/">Home</Link>
             <Link to="/settings">Settings</Link>
             <Link to="/profile">Profile</Link>
             <Link to="/update-password">Update Password</Link>
            </form>
      </nav>
      </div>
    )
  }
}

export default TopNavBar;