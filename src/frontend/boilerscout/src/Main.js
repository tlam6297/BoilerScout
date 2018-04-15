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
import Forum from './Forum'
import Inbox from './Inbox'
import PassUp from './PasswordUpdated'

import Outbox from './Outbox'
import ValidateReset from './ValidateReset'

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
        <Route path="/forum" component={Forum} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/outbox" component={Outbox} />
        <Route path="/password-updated" component={PassUp} />
        <Route path="/validate-reset" component={ValidateReset}/>
      </Switch>
    </div>
  )
}
}

export default Main;