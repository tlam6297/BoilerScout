import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import POSTRequest from './POSTRequest'
import Logo from './Logo'

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      redirect: false,
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
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
    
    const payload = JSON.stringify ({
      'email': this.state.email,
    });

    const post = new POSTRequest(payload, 'http://localhost:8080/resend-confirmation');
    post.send();

    // console.log(post.responseOk());
    
    if (post.responseOk()) {
      this.setState({ redirect: true });      
    } else {
      alert("ERROR: email doesn't exist");
    }
  }

  render() {
    return (
      <div className="ForgotPassword" class="fg">
        <div className="logo">
          <Logo />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="Form" class="Form">
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
          </div>
            <Button
              block
              bsSize="small"
              disabled={!this.validateForm()}
              type="submit">
              SUBMIT        
            </Button>
        </form>
        <Link to="/login">Return to Login</Link>
        {this.state.redirect && (
          <Redirect to={'/confirmation-resent'}/>   
        )}
      </div>
    );
  }
}

export default ForgotPassword