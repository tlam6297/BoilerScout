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
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
            <a href="#home">BoilerScout</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem eventKey={1} href="#">
            Settings
            </NavItem>
            <NavItem eventKey={2} href="#">
            Profile
            </NavItem>
        </Nav>
    </Navbar> )
        }

    }

    export default TopNavBar;