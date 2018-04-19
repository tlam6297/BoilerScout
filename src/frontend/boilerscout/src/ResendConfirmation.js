import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Logo from './Logo'
import './ResendConfirmation.css'
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

    // const post = new POSTRequest(payload, 'http://localhost:8080/send/verification');
    // post.send();

    ////////////////////////
    const _this = this;


    fetch('http://localhost:8080/send/verification', {
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
        _this.setState({ redirect: true });  
      } else {
        alert("ERROR: email doesn't exist");
      }      
    })


    //////////////////////

    // console.log(post.getResponse());
    
    // if (post.responseOk()) {
    //   this.setState({ redirect: true });      
    // } else {
    //   alert("ERROR: email doesn't exist");
    // }
  }

  render() {
    return (
      <div className="wrapper">
      <div className="ResendConfirmation">
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
              className="submitbutton"
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
      </div>
    );
  }
}

export default ForgotPassword