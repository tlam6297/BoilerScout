import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './Main.css'
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
import Settings from './Settings'
import Profile from './Profile'
import ProfileCreated from './ProfileCreated'
import Community from './Community'
import CreateAThread from './CreateAThread'
import Forum from './Forum'
import Thread from './Thread'

class Main extends Component  {
constructor(props) {
  super(props)

  this.handleClick = this.handleClick.bind(this);
  this.state = {
  }
}

handleClick = (e) => {
  e.preventDefault();
}

render () {
  return (
    <div className="Home">          
      <Switch>
        <Route exact path="/" component={Buttons} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/password-reset-sent" component={PasswordSent} />
        <Route path="/confirmation-resent" component={ConfirmationSent} />
        <Route path="/advanced-filters" component={AdvancedFilters} />
        <Route path="/update-password" component={UpdatePassword} />
        <Route path="/scout" component={Scout} />
        <Route path="/resend-confirmation" component={ResendConfirmation} />
        <Route path="/update-password" component={UpdatePassword} />
        <Route path="/settings" component={Settings}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/profile-created" component={ProfileCreated} />
        <Route path="/community" component={Community}/>
        <Route path="/create-thread" component={CreateAThread}/>
        <Route path="/forum" component={Forum}/>
        <Route path="/view-thread" component={Thread}/>
      </Switch>
    </div>
  )
}
}

export default Main;