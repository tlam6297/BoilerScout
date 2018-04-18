import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Main from './Main'
import SignUp from './SignUp'

class App extends Component {
  constructor() {
    super()

    this.state = {
      userid: null,
      signedIn: false,
    }
  }

  // Return user id if signed in, null if not
  signedIn = () => {
    return this.state.signedIn
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
        <div className="Container">
          <Main/>
        </div>
      </div>
    )
  }
}

export default App;