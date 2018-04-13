import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import { Button } from "react-bootstrap";
import './CreateAThread.css'
import NavBar from './TopNavBar'

class Thread extends Component {
    constructor() {
      super()
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
         this.getID = this.getID.bind(this);
   
         this.state = {
          threadTitle: "",
          threadBody: "",
          threadId: "",
          token: "",
          userId: "",
          postBody: "",
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

    componentWillMount = () => {
        const user_id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const threadId = localStorage.getItem("thread_id");

        this.setState({
            token: token,
            threadId: threadId,
            userId: user_id,
        })
        const url = "http://localhost:8080/view-thread?userId=" + user_id + "&token=" + token + "&threadId=" + threadId;

        axios.get(this.state.url)
        .then(res => {
            // console.log(res.data.query);
            if (res.data.status == "OK") {
                this.setState({
                results: res.data.query,
                });        
            } else {
                alert("Invalid Token- Please login again");
                this.setState({
                redirect: true,
                })
            }      
        });
    }
   
   
    getLocalStorage = (key) => {
      return localStorage.getItem(key);
    }
   
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ redirect: true })
      const _this = this;
      const id = _this.getLocalStorage("id");
      let token = _this.getLocalStorage("token");
      let forum_id = this.getLocalStorage("forum_id");
      let title = document.getElementById('threadTitle').textContent;


      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "forumId": forum_id,
        "threadId": this.state.threadTitle,
        "postBody": this.state.postBody,
      });
      
      fetch('http://localhost:8080/post-reply', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json;charset=UTF-8',
         'transfer-encoding': 'chunked',
       },
       body: payload,
     })
     .then(function(response) {
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
          this.setState({
            [event.target.id]: event.target.value
          });        
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
        <div className="Thread">
        <NavBar/>
          <div className="Container">
          <p/>
                <div 
                    id="threadTitle"> 
                    {this.state.threadTitle}
                </div>
                <p/>
                <div 
                    id="threadBody"> 
                    {this.state.threadBody}
                </div>
                <p/>
          </div>
        </div>
      )
    }
   }
   
   export default Thread;
   
   