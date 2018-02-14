import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

class Buttons extends Component {

    render() {
        return (
        <div className="Buttons">
            <div className="SignUpButton">
               <Link to="/sign-up"><button>SIGN UP</button></Link>
            </div>
            <div className="LoginButton">
               <Link to="/login"><button onClick={this.loginClick}>LOGIN</button></Link>
            </div>
            <Route exact path="/sign-up" component={SignUp}/>
            <Route exact path="/login" component={Login}/>        
       </div>
        );
        }

}

export default Buttons;