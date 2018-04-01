import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './Home.css'
import logo from './logo.svg'
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
          <Route path="/advanced-filters" component={AdvancedFilters} />
          <Route path="/scout" component={Scout} />
          <Route path="/update-password" component={UpdatePassword} />
        </Switch>
      </div>
    )
  }
}

export default Home;