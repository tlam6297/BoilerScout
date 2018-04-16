import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import logo from './logo.svg'

class Buttons extends Component {

  render() {
    return (
      <div className="Buttons">
        <div className="SignUpButton">
          <Route render={({ history }) => (
            <button
              type='button'
              onClick={() => { history.push('/sign-up') }}
            >
            SIGN UP
            </button>
          )} />
        </div>
        <div className="LoginButton">
          <Route render={({ history }) => (
            <button
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
    );
  }
}

export default Buttons;