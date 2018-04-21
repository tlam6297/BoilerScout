import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import './EditProfile.css'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import './Thread.css'
import NavBar from './TopNavBar'
import axios from 'axios'
import PostReply from './PostReply'

class Thread extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.renderComments = this.renderComments.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
      this.getID = this.getID.bind(this);
      this.renderReplyBox = this.renderReplyBox.bind(this);
      this.disabledReply = this.disabledReply.bind(this);
      this.validateReply = this.validateReply.bind(this);
         this.state = {
          threadTitle: "",
          threadBody: "",
          body: "",
          thread: {},
          comments: [],
          threadId: props.location.search.substring(4),
          token: "",
          postBody: "",
          replytoggle: false,
      }
    }
    
    // Return user id if signed in, null if not
    signedIn = () => {
      return this.state.signedIn
    }
    reloadReplies = () => {
      const user_id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const thread_id = this.state.threadId;
        console.log("userid:" + user_id);
        console.log("token:" + token);
        console.log("threadid:" + thread_id);
        const url = "http://localhost:8080/community/view-thread?userId=" + user_id + "&token=" + token + "&threadId=" + thread_id;
        axios.get(url)
        .then(res => {
            // console.log(res.data.query);
            if (res.status == 200) {
                this.setState({
                comments: res.data.comments,
                thread: res.data.thread[0],
                });  
            } else {
                alert("Invalid Token- Please login again");
                this.setState({
                redirect: true,
                })
            }    
            
            console.log(res.data.status);

        })
        .catch(error => {
          console.log(error);
        }
      );
    }
    componentWillMount = () => {

      console.log("Checking if valid token...")
      axios.get("http://localhost:8080/verify-authentication?" + "userId=" + localStorage.getItem("id") + "&token=" + localStorage.getItem("token"))
    
      .then(res => {
        if (res.data == false) {
          console.log("Not valid token")
          this.setState({
            redirect1: true,
          })
        } else {
          console.log("Valid Token")
          this.setState({
            redirect1: false,
          })
        }
      })

        const user_id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const thread_id = this.state.threadId;
        console.log("userid:" + user_id);
        console.log("token:" + token);
        console.log("threadid:" + thread_id);
        const url = "http://localhost:8080/community/view-thread?userId=" + user_id + "&token=" + token + "&threadId=" + thread_id;
        axios.get(url)
        .then(res => {
            // console.log(res.data.query);

            if (res.status == 200) {
                this.setState({
                comments: res.data.comments,
                thread: res.data.thread[0],
                });  

                console.log(res.data)
                console.log(this.state);
            } else {
                alert("Invalid Token- Please login again");
                this.setState({
                redirect: true,
                })
            }      
        })
        .catch(error => {
          console.log(error);
        }
      );
    }
    getThreadId = () => {
      return this.state.threadId;
    }

    validateReply = () => {
      if (this.state.body == "") {
        document.getElementById('body').setCustomValidity("Please enter a reply body");
        console.log("body");
      } else {
        document.getElementById('body').setCustomValidity("");
      }
    }
   
   
    getLocalStorage = (key) => {
      return localStorage.getItem(key);
    }
    handleSubmit = (event) => {
      event.preventDefault();
      const _this = this;
      const id = _this.getLocalStorage("id");
      let token = _this.getLocalStorage("token");
      let forumID = _this.getLocalStorage("forum_id");
      const threadId = _this.getLocalStorage("threadId");
      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "threadId": threadId,
        "postBody": this.state.body,
      });
      
      fetch('http://localhost:8080/community/post-reply', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json;charset=UTF-8',
         'transfer-encoding': 'chunked',
       },
       body: payload,
     })
     .then(function(response) {
       if (response.status == 200) {
         //_this.setState({ redirect: true })
         response.json().then(json => {
           console.log(json);
         });
            
       } else {
         alert("Error in posting comment");
       }     
     })
        this.reloadReplies();
     }

     disabledReply = () => {
       if (this.state.body == "") {
         return true;
       } else {
         return false;
       }
     }
  
    renderReplyBox = () => {    
      return (
        <div className="Thread">
          <br/>
          <form onSubmit={this.handleSubmit}>
            <div className="reply">
                <textarea
                  className="bodyonly"
                  type="text"
                  id="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
                <br/>
                <Button
                bsSize="small"
                type="submit"
                disabled={!this.disabledReply}>
                SUBMIT       
              </Button>
              <div id="success">
             
             </div>
            </div>
          </form>
        </div>
      )
    }
   
   
   
   
      handleChange = (event) => {
        let mytarget = event.target.id;
          this.setState({
            [event.target.id]: event.target.value
          }, () => {
            if (mytarget == 'body') {
              console.log("lol");
              this.validateReply();
            }
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
    toggle = () => {
      this.setState({
          replytoggle: !this.state.replytoggle,
      });
      localStorage.setItem("threadId", this.state.threadId);
  }
 
    renderComments = () => {
     return ( <div className="comments">
      <ul>
        <div className='li-thread'>
          {this.state.comments.map((result, index) =>
              <li key={index}>
                <div class="grid-container-thread" className='result entry'>
                <Link to={
                `/profile?user_id=` + result.user_id
                  } className="link">
                  <div class="grid-item" className="name entry">
                    {result.full_name}
                  </div>
                  </Link>
                  <div class="grid-item" className="body entry">
                    {result.post_body}
                  </div>
                  <div class="grid-item" className="date entry">
                    {result.post_date}
                  </div>
                </div>
              </li>
          )}
        </div>
      </ul>
    </div>
     )
    }

    rednerRedirect = () => {
      if (this.state.redirect1) {
        this.setState({
          redirect1: false,
        })
        return (<Redirect to="/" />)
      }
    }
   
    render() {
      return (
        <div className="Container">
        {this.rednerRedirect()}
        <NavBar/>
          <div className="Thread">
          <p/>
                <div 
                    id="threadTitle"> 
                    {this.state.thread.thread_title}
                </div>
                <Link to={
                  `/profile?user_id=` + this.state.thread.user_id
                } id="link">
                <div 
                    id="threadUser"> 
                    by {this.state.thread.full_name}
                </div>
                </Link>
                <p/>
                <div 
                    id="threadBody"> 
                    {this.state.thread.thread_body}
                </div>
                <div 
                    id="threadTime"> 
                    {this.state.thread.thread_date}
                </div>
                <p/>
          </div>
          <div className="postReply">
          <button
            type="button"
            onClick={this.toggle}>
            Post Reply
          </button>
          {this.state.replytoggle && this.renderReplyBox()}
          </div>
          <div className="Comments">
            {this.renderComments()}
          </div>
        </div>
      )
    }
   }
   
   export default Thread;
