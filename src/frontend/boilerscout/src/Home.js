import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import './Home.css';
import Login from './Login';
import SignUp from './SignUp';
import Buttons from './Buttons';

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
            console.log("WOW")
    }

    render () {
    return (
    // Negate Buttons when SignUp or Login is picked
    this.state && this.state.showButtons ? <Buttons/> :<Login />
    )
    }
}

export default Home;