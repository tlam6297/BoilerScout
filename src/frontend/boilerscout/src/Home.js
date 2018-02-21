import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import './Home.css';
import Login from './Login';
import SignUp from './SignUp';
import Buttons from './Buttons';
import ResendConfirmation from './ResendConfirmation';

class Home extends Component  {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            showButtons: true,
            showLogin: false,
            showSignUp: false,
        }
    }
    handleClick = (e) => {
            e.preventDefault();
    }

    render () {
    return (
        <Switch>
        <Route exact path="/" component={Buttons} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    )
    }
}

export default Home;