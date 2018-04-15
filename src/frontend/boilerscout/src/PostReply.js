import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import axios from 'axios'
class PostReply extends Component {
constructor() {
  super()
  this.handleSubmit = this.handleSubmit.bind(this);
  this.removeWhiteSpaces = this.removeWhiteSpaces.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.getAccessToken = this.getAccessToken.bind(this);
     this.getID = this.getID.bind(this);

     this.state = {
       body: "",
       toggle: false,
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


getLocalStorage = (key) => {
  return localStorage.getItem(key);
}

componentDidMount = () => {
  const user_id = this.getLocalStorage("id");
  const token = this.getLocalStorage("token");
  // const requested_id = this.state.user_id;

  const url = "http://localhost:8080/profile/get?id=" + user_id + "&token=" + token + "&query=" + user_id;

  axios.get(url)
  .then(res => {
      if (res.status == 200) {
          this.setState({
              ...res.data,
          }); 
         
          console.log(res.data);
      } else {
          alert("Invalid Token- Please login again");
          this.setState({
              redirect: true,
          })
      }
  });

}

removeWhiteSpaces = (array) => {
 var i;

 for (i = 0; i < array.length; i++) {
   var curr = array[i];
   var nowhite = curr.replace(/\s/g, "");
   array[i] = nowhite;
 }

 console.log(array);

 return array;
}



handleSubmit = (event) => {
   event.preventDefault();
   const _this = this;
   const id = _this.getLocalStorage("id");
   let token = _this.getLocalStorage("token");
   let forum_id = this.getLocalStorage("forum_id");
   const threadId = localStorage.getItem("thread_id");

   var payload = JSON.stringify({
     "userId": id,
     "token": token,
     "threadId": threadId,
     "postBody": this.state.body,
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
      //_this.setState({ redirect: true })
      response.json().then(json => {
        console.log(json);
      });
    } else {
      alert("Error in posting comment");
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


render() {   
  return (
    <div className="EditProfile">
      <div className="Container">
        <button
          type="button"
          onClick={this.toggle}>
          Post Reply
      </button>
      <br/>
      <form onSubmit={this.handleSubmit}>
        <div className="Form">
        <FormGroup controlId="Body" bsSize="large">
            <FormControl
              className="FormInput body"
              autoFocus
              type="text"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </FormGroup>
            <Button
            bsSize="small"
            type="submit">
            SUBMIT      
          </Button>
          <div id="success">
        
         </div>
        </div>
      </form>
      </div>
    </div>
  )
}
}

export default PostReply;



