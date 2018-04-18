import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import UpdatePassword from './UpdatePassword.js'
import TopNavBar from './TopNavBar.js'
import EditProfile from './EditProfile.js'
import axios from 'axios'

class Settings extends Component {
constructor (props) {
 super(props);
 this.state = {
  active: false,
 };

 this.toggleUpdatePassword = this.toggleUpdatePassword.bind(this);
}

toggleUpdatePassword = () => {
  this.setState({
      active: !this.state.active
  });
  console.log(this.state.active);
}

validateForm = () => {
 const email = this.state.email.toLowerCase();
 const regex = /^\S+@purdue.edu$/;
 const validEmail = regex.test(email);
 console.log("Good email?: " + validEmail);
 // Password must have 8 characters, include an uppercase letter, lowercase letter, one special character  and a number
 const password = this.state.password;
 const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
 const validPassword = passwordregex.test(password);
 console.log("Password good?" + validPassword);

 //return (validEmail & validPassword  );
 return true;
}




/* handleSubmit = (event) => {
 event.preventDefault();
 const _this = this;
 const payload = JSON.stringify({
   "email": "lam45@purdue.edu",
   "password": "test1234",
 });
 fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json;charset=UTF-8',
     'transfer-encoding': 'chunked',
  },
   body: payload,
 })


}
*/
rednerRedirect = () => {
  if (this.state.redirect) {
    this.setState({
      redirect: false,
    })
    return (<Redirect to="/" />)
  }
}

componentWillMount = () => {
  console.log("Checking if valid token...")
  axios.get("http://localhost:8080/verify-authentication?" + "userId=" + localStorage.getItem("id") + "&token=" + localStorage.getItem("token"))

  .then(res => {
    if (res.data == false) {
      console.log("Not valid token")
      this.setState({
        redirect: true,
      })
    } else {
      console.log("Valid Token")
      this.setState({
        redirect: false,
      })
    }
  })
}

render() {
 return (
   <div className="Settings">
   {this.rednerRedirect()}
     <TopNavBar/>
      <EditProfile/>
      </div>
 )
}
}

export default Settings;



