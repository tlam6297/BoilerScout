import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import './Home.css';
import Login from './Login';
import SignUp from './SignUp';

class Home extends Component  {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (e) => {
            e.preventDefault();
            console.log("WOW")
    }

    render () {
    return (
        <div className="Home">
             <div className="SignUpButton">
                <Link to="/sign-up"><button>SIGN UP</button></Link>
             </div>
             <div className="LoginButton">
                <Link to="/login"><button>LOGIN</button></Link>
             </div>
             <Route exact path="/sign-up" component={SignUp}/>
             <Route exact path="/login" component={Login}/>       
        </div>
    );

    }
}

export default Home;