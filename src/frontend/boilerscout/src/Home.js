import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './Home.css'
import {spring, AnimatedSwitch } from 'react-router-transition';
import Logo from './Logo'
import Login from './Login'
import SignUp from './SignUp'
import Buttons from './Buttons'
import ForgotPassword from './ForgotPassword'
import PasswordSent from './PasswordSent'
import ResendConfirmation from './ResendConfirmation'
import ConfirmationSent from './ConfirmationSent'
import Scout from './Scout'
import AdvancedFilters from './AdvancedFilters'
import UpdatePassword from './UpdatePassword'
import NavBar from './TopNavBar'

class Home extends Component  {
  constructor(props) {
    super(props)
    this.bounce = this.bounce.bind(this);
    this.mapStyles = this.mapStyles.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      bounceTransition: {
        atEnter: {
          opacity: 0.2,
          scale: 0.8,
        },
        atLeave: {
          opacity: this.bounce(0),
          scale: this.bounce(0.8),
        },
        atActive: {
          opacity: this.bounce(1),
          scale: this.bounce(1),
        },
      }
    }
  }

  mapStyles = (styles) => {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  }
  
  // wrap the `spring` helper to use a bouncy config
   bounce = (val) => {
    return spring(val, {
      stiffness: 100,
      damping:20,
    });
  }

  handleClick = (e) => {
    e.preventDefault();
  }

  render () {
    return (
      <div className="Home"> 
      <Logo/>           
       <AnimatedSwitch
        atEnter={this.state.bounceTransition.atEnter}
        atLeave={this.state.bounceTransition.atLeave}
        atActive={this.state.bounceTransition.atActive}
        mapStyles={this.mapStyles}
        className="route-wrapper"
      >
        <Route exact path="/" component={Buttons} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        </AnimatedSwitch>
      </div>
    )
  }
}

export default Home;