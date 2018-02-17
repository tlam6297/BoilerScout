import React, {Component} from 'react'
import { BrowserRouter as Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './SignUp.css'

class SignUp extends Component {
    constructor (props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            redirect: false,
        };
    }

    validateForm = () => {
        const email = this.state.email.toLowerCase();
        const password = this.state.password;
        const regex = /^\S+@purdue.edu$/;
        const validEmail = regex.test(email);
        
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

    render () {
    return (
        <div className="SignUp">
            <form onSubmit={this.handleSubmit}>
            <div className="Form">
            <FormGroup controlId="signup" bsSize="large">
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password:</ControlLabel>
             <FormControl
                BGColor="white"
                autoFocus
                type="password"
                value={this.state.password}
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
        </div>
    )
    }

}

export default SignUp;