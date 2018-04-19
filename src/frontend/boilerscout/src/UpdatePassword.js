import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./UpdatePassword.css"
import Nav from './TopNavBar'
import axios from 'axios'

class UpdatePassword extends Component {
  constructor(props) {
    super(props)

    this.state= {
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
      redirect: false,
    }
  }

  validateForm = () => {    
    // Password must have 8 characters, include an uppercase letter, lowercase letter, one special character  and a number
    const oldPassword = this.state.oldPassword;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const validOldPassword = passwordregex.test(oldPassword);

    const newPassword1 = this.state.newPassword1;
    const newPassword2 = this.state.newPassword2;

    const validNewPassword = passwordregex.test(newPassword1);

    const passwordsMatch = (newPassword1 == newPassword2);

    return (passwordsMatch && validNewPassword);
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  handleChange = (event) => {
    let mytarget = event.target.id;
    this.setState({
      [event.target.id]: event.target.value,
      changed: true,
    }, (event) => {
      switch (mytarget) {
        case 'newPassword1':
          this.validateNewPassword();
          this.validateRepeatNewPassword();
          break;
        case 'newPassword2':
          this.validateRepeatNewPassword();
          break;
        default:
          break;
      }
    });
  }

  validateOldPassword = () => {
    const password = this.state.oldPassword;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    let passtemperror = ["Your old password "];
    let passerror;
    const validPassword = passwordregex.test(password);

    if (!validPassword) {
      const passonedigit = /^(?=.*[0-9])/;
      const passoneuppercase = /^(?=.*[A-Z])/;
      const passonespecialchar = /^(?=.*[$@$!%*?&])/;
      const passlengtheight = /^.{8,12}$/;
      let i = 1;
      if (!passonedigit.test(password)) {
        passtemperror[i] = "must have had one digit"
        i++;
      }

      if (!passoneuppercase.test(password)) {
        if (i != 1) {
          passtemperror[i] = ", one uppercase character"
        } else {
          passtemperror[i] = "must have had one uppercase character"
        }
        i++;
      }

      if (!passonespecialchar.test(password)) {
        if (i != 1) {
          passtemperror[i] = ", one special ($@$!%*?&) character. "
        } else {
          passtemperror[i] = "must have had one special ($@$!%*?&) character. "
        }
        i++;
      }

      if (!passlengtheight.test(password)) {
        if (i != 1) {
          passtemperror[i] = "Password length must be between 8 and 12 characters"
        } else {
          passtemperror[i] = "length must have been between 8 and 12 characters"
        }
        i++;
      }

      passtemperror[i] = ".";


      passerror = passtemperror.join("");
      document.getElementById("oldPassword").setCustomValidity(passerror);

    } else {
      document.getElementById("oldPassword").setCustomValidity("");
    }

  }

  validateNewPassword = () => {
    const password = this.state.newPassword1;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    let passtemperror = ["Password "];
    let passerror;
    const validPassword = passwordregex.test(password);

    if (!validPassword) {
      const passonedigit = /^(?=.*[0-9])/;
      const passoneuppercase = /^(?=.*[A-Z])/;
      const passonespecialchar = /^(?=.*[$@$!%*?&])/;
      const passlengtheight = /^.{8,12}$/;
      let i = 1;
      if (!passonedigit.test(password)) {
        passtemperror[i] = "must have one digit"
        i++;
      }

      if (!passoneuppercase.test(password)) {
        if (i != 1) {
          passtemperror[i] = ", one uppercase character"
        } else {
          passtemperror[i] = "must have one uppercase character"
        }
        i++;
      }

      if (!passonespecialchar.test(password)) {
        if (i != 1) {
          passtemperror[i] = ", one special ($@$!%*?&) character. "
        } else {
          passtemperror[i] = "must have one special ($@$!%*?&) character. "
        }
        i++;
      }

      if (!passlengtheight.test(password)) {
        if (i != 1) {
          passtemperror[i] = "Password length must be between 8 and 12 characters"
        } else {
          passtemperror[i] = "length must be between 8 and 12 characters"
        }
        i++;
      }

      passtemperror[i] = ".";


      passerror = passtemperror.join("");
      document.getElementById("newPassword1").setCustomValidity(passerror);

    } else {
      document.getElementById("newPassword1").setCustomValidity("");
    }

  }

  validateRepeatNewPassword = () => {
    const password = this.state.newPassword1;
    const repeatpass = this.state.newPassword2;
    const repeatPassword = (password == repeatpass);
    if (!repeatPassword) {
      document.getElementById("newPassword2").setCustomValidity("Passwords don't match.");
    } else {
      document.getElementById("newPassword2").setCustomValidity("");
    }

  }
  handleSubmit = (e) => {
    this.validateNewPassword();
    this.validateRepeatNewPassword();

    if (this.validateForm()) {
    e.preventDefault();
    const _this = this;

    //send post
    const id = this.getLocalStorage("id");
    const token = this.getLocalStorage("token");

    const oldPass = this.state.oldPassword;
    const newPass1 = this.state.newPassword1;
    const newPass2 = this.state.newPassword2;

    const payload = JSON.stringify({
      "userId": id,
      "token": token,
      "currentPassword": oldPass,
      "newPassword": newPass1,
      "confirmPassword": newPass2
    });

    fetch('http://localhost:8080/update-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      console.log(response);   
      if (response.ok) {
        _this.setState({ redirect: true })
      } else {
        alert("Error, old password is not correct")
      } 
    })

  }
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
    return(
      <div>
        <div className="UpdatePassword">      
        <form novalidate onSubmit={this.handleSubmit}>
          <div className="Form" >
            <h2 id="passwordedit">Update Password</h2>
              <FormGroup controlId="oldPassword" bsSize="large">
                <ControlLabel className="edit">Enter old password:</ControlLabel>
                <br/>
                <FormControl
                  className="FormInput FormInput-Password"
                  autoFocus
                  type="password"
                  value={this.state.oldPassword}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="newPassword1" bsSize="large">
                <ControlLabel className="edit">Enter new password:</ControlLabel>
                <br/>
                <FormControl
                  className="FormInput FormInput-Password"
                  autoFocus
                  type="password"
                  value={this.state.newPassword1}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="newPassword2" bsSize="large">
                <ControlLabel className="edit">Enter new password again:</ControlLabel>
                <br/>
                <FormControl
                  className="FormInput FormInput-Password"
                  autoFocus
                  type="password"
                  value={this.state.newPassword2}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                block
                bsSize="small"
                id="submitbutton"
                type="submit">
                SUBMIT        
              </Button>
          </div>
            </form>
        </div>
      </div>
    )
  }
}

export default UpdatePassword;