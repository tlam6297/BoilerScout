import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Logo from './Logo';
import axios from 'axios'

class Verify extends Component {
  constructor(props) {
    super(props)

    this.doGET(props.location.search);

    this.state = {
      uri: props.location.search,
      render: false,
      render: false,
      text: "Verifying Email...",
    }
  }

  doGET = (uri) => {
    const _this = this;
    axios.get("http://localhost:8080/verify" + uri)
    .then(res => {
      console.log(res.data)
      if (res.data.status == "OK") {
        _this.setState({
          render: true,
          text: "Profile successfully verified",
        })
      } else {
        _this.setState({
          text: res.data.Response,
        })
      }
    })
    .catch(err => {
      _this.setState({
        text: "Invalid ID. Please try resend confirmation again.",
      })
    });    
  }

  render() {
    return (
      <div className="Verify">
        <div className="logo">
          <Logo />
        </div>            
        <h1>{this.state.text}</h1>
        <Link to="/login">Go to Login</Link>
      </div>
    )
  }
}

export default Verify;