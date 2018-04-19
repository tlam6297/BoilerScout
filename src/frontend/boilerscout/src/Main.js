import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import {spring, AnimatedSwitch } from 'react-router-transition';
import './Main.css'
import Login from './Login'
import SignUp from './SignUp'
import Buttons from './Buttons'
import ForgotPassword from './ForgotPassword'
import PasswordSent from './PasswordSent'
import ResendConfirmation from './ResendConfirmation'
import ConfirmationSent from './ConfirmationSent'
import Scout from './Scout'
import UpdatePassword from './UpdatePassword'
import NavBar from './TopNavBar'
import Settings from './Settings'
import Profile from './Profile'
import ProfileCreated from './ProfileCreated'
import Forum from './Forum'
import Community from './Community'
import CreateAThread from './CreateAThread'
import Thread from './Thread'
import Home from './Home'
import Inbox from './Inbox'
import Logout from './Logout'
import PassUp from './PasswordUpdated'
import PassUpOutside from './PasswordUpdatedOutside'
import Outbox from './Outbox'
import ValidateReset from './ValidateReset'

import axios from 'axios'

class Main extends Component  {
constructor(props) {
  super(props)
  this.bounce = this.bounce.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.mapStyles = this.mapStyles.bind(this);

  this.state = {
    redirect: false,
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

handleClick = (e) => {
  e.preventDefault();
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

// componentWillMount = () => {
//   console.log("Checking if valid token...")
//   axios.get("http://localhost:8080/verify-authentication?" + "userId=" + localStorage.getItem("id") + "&token=" + localStorage.getItem("token"))

//   .then(res => {
//     if (res.data == false) {
//       console.log("Not valid token")
//       this.setState({
//         redirect: true,
//       })
//     } else {
//       console.log("Valid Token")
//       this.setState({
//         redirect: false,
//       })
//     }
//   })
// }
// rednerRedirect = () => {
//   if (this.state.redirect) {
//     this.setState({
//       redirect: false,
//     })
//     return (<Redirect to="/" />)
//   }
// }

render () {
  return (
    <div className="Home">   
      <AnimatedSwitch
        atEnter={this.state.bounceTransition.atEnter}
        atLeave={this.state.bounceTransition.atLeave}
        atActive={this.state.bounceTransition.atActive}
        mapStyles={this.mapStyles}
        className="route-wrapper"
      >
        <Route exact path="/" component={Buttons} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Buttons} />
        <Route path="/scout" component={Scout} />  
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/password-reset-sent" component={PasswordSent} />
        <Route path="/confirmation-resent" component={ConfirmationSent} />
        <Route path="/update-password" component={UpdatePassword} />
        <Route path="/resend-confirmation" component={ResendConfirmation} />
        <Route path="/settings" component={Settings}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/profile-created" component={ProfileCreated} />
        <Route path="/forum" component={Forum} />
        <Route path="/community" component={Community}/>
        <Route path="/create-thread" component={CreateAThread}/>
        <Route path="/view-thread" component={Thread}/>
        <Route path="/inbox" component={Inbox} />
        <Route path="/outbox" component={Outbox} />
        <Route path="/logout" component={Logout} />
        <Route path="/validate-reset" component={ValidateReset}/>
        <Route path="/password-updated" component={PassUp} />
        <Route path="/password-updated-outside" component={PassUpOutside}/>
        
      </AnimatedSwitch>
    </div>
  )
}
}

export default Main;