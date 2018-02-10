import React, { Component } from 'react'

import logo from './logo.svg'
import './App.css'
import Home from './Home'


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

  renderMain() {
    return (
      <Main/>
    )
  }


  render() {
    return (
      <div class="extended row header">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BoilerScout</h1>
        </header>
        <Home/>
      </div>
    )
  }
}

export default App;
