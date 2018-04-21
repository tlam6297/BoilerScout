import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import { Button, FormGroup, FormControl, Feedback } from "react-bootstrap";
import './CreateAThread.css'

class CreateAThread extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.validateTitle = this.validateTitle.bind(this);
    this.getID = this.getID.bind(this);

    this.state = {
      threadTitle: "",
      threadBody: "",
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
      { uid: user.uid }
    )
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  validateForm = () => {
      let isvalid = true;
      if (this.state.threadTitle == "") {
        return true;
      } else {
        return false;
      }
  
      if (this.state.threadBody == "") {
        return true;
      } else {
        return false;
      }
    
  }

  handleSubmit = (event) => {
    const _this = this;
    const id = _this.getLocalStorage("id");
    let token = _this.getLocalStorage("token");
    let forum_id = _this.getLocalStorage("forum_id");

    this.setState({ redirect: true })
    var payload = JSON.stringify({
      "userId": id,
      "token": token,
      "forumId": forum_id,
      "threadTitle": this.state.threadTitle,
      "threadBody": this.state.threadBody,
    });

    console.log(payload);

    fetch('http://localhost:8080/community/start-thread', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
      .then(function (response) {
        if (response.ok) {
          // redirect to profile?
          //_this.setState({ redirect: true })
          response.json().then(json => {
            console.log(json);
          });

        } else {
          alert("Error in updating profile");
        }
      })
  }


  handleChange = (event) => {
    let mytarget = event.target.id;
    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      switch (mytarget) {
        case 'threadTitle':
        console.log("wow");
                  this.validateTitle();
          break;
        case 'threadBody':
          this.validateBody();
          break;
        default:
          break;
      }
    });

  }

  validateTitle = () => {
    if (this.state.threadTitle == "") {
      document.getElementById('threadTitle').setCustomValidity("Please enter thread title");
    } else {
      console.log("is it?");
      document.getElementById('threadTitle').setCustomValidity("");
    }
  }

  validateBody = () => {
    if (this.state.threadBody == "") {
      document.getElementById('threadBody').setCustomValidity("Please enter the body of your thread");
    } else {
      document.getElementById('threadBody').setCustomValidity("");
    }
  }

  getAccessToken = () => {
    // The type of token might be JSON
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('No Token Found');
    }
    return token;
  }


  getID = () => {
    // The type of token might be JSON
    const id = localStorage.getItem("id");
    if (!id) {
      throw new Error('No ID Found');
    }
    return id;
  }
  componentDidUpdate = () => {
    console.log(this.state);


  }
  // handle unauth, remove userid
  handleUnauth = () => {
    localStorage.removeItem('uid')
  }

  render() {
    return (
      <div className="CreateAThread">
        <div className="Container">
          <form novalidate onSubmit={this.handleSubmit}>
            <p />
            <FormGroup controlId="threadTitle" bsSize="large">
              <br />
              <FormControl
                autoFocus
                type="text"
                value={this.state.threadTitle}
                onChange={this.handleChange}
                placeholder="Enter a catchy title!"
              />
            </FormGroup>
            <p />
            <br />
            <textarea
              id="threadBody"
              type="text"
              value={this.state.threadBody}
              onChange={this.handleChange}
              placeholder="Nobody wants to see an empty thread!"
            />
            <p />
            <Button
              bsSize="small"
              type="submit"
              disabled={this.validateForm}>
              SUBMIT
             </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateAThread;



