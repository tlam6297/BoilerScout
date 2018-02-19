import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Home from './Home'
import Main from './Main'
import SignUp from './SignUp'

class App extends Component {
  constructor() {
    super()

    this.state = {
      userid: null,
    }
  }

  // Return user id if signed in, null if not
  signedIn = () => {
    return false
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Container">
        <Home/>
         </div>
      </div>
    )
  }
}

export default App;