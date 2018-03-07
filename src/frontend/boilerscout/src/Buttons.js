import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Logo from './Logo.js';
import { Button} from "react-bootstrap";


class Buttons extends Component {

  render() {
    return (
      <div className="Buttons">
      <Logo/>
        <div className="SignUpButton">
          <Route render={({ history }) => (
            <Button
            block
            bsSize="small"
            onClick={() => { history.push('/sign-up')}}
            type="submit">
            SIGN UP        
          </Button>
          )} />
        </div>
        <div className="LoginButton">
        <Route render={({ history }) => (
            <Button
            block
            bsSize="small"
            onClick={() => { history.push('/login')}}
            type="submit">
            LOGIN       
          </Button>
          )} />
        </div>
        <Route exact path="/sign-up" component={SignUp}/>
        <Route exact path="/login" component={Login}/>        
      </div>
    );
  }
}

export default Buttons;