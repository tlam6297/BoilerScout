import React, { Component } from 'react'

import logo from './logo.svg'
import './App.css'
import Home from './Home'
import ForgotPassword from './ForgotPassword'
import { BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom'
import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      userid: null,
    }
  }
  // Return user id if signed in, null if not
  signedIn = () => {
    return this.state.uid
  }
  // handle auth, set userid
  handleAuth = (user) => {
    localStorage.setItem('userid', user.uid)
    this.setState( 
      {uid: user.uid}
    )
  }
  // handle unauth, remove userid
  handleUnauth = () => {
    localStorage.removeItem('uid')
  }

  render() {
    return (
      <div class="extended row header" className="App">
      {console.log("HERE: " + this.props.children)}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Container">
          <Router>
            <Route path="/" component={Home}>
              <Route path="forgot-password" component={ForgotPassword}></Route>
            </Route>
          </Router>
        </div>
      </div>
    )
  }
}

export default App;