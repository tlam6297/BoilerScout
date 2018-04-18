import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Logo from './Logo';
import './Buttons.css'
class Buttons extends Component {

  render() {
    return (
      <div className="wrapper">
      <div className="Buttons">
      <Logo/>
        <div>
          <Route render={({ history }) => (
            <button
              id="SignUpButton"
              type='button'
              onClick={() => { history.push('/sign-up') }}
            >
            SIGN UP
            </button>
          )} />
        </div>
        <div>
          <Route render={({ history }) => (
            <button
              id="LoginButton"
              type='button'
              onClick={() => { history.push('/login') }}
            >
            LOGIN
            </button>
          )} />
        </div>
        <Route exact path="/sign-up" component={SignUp}/>
        <Route exact path="/login" component={Login}/>        
      </div>
      </div>
    );
  }
}

export default Buttons;