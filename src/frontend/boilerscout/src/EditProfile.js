import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import axios from 'axios'
class EditProfile extends Component {
 constructor() {
   super()
   this.handleSubmit = this.handleSubmit.bind(this);
   this.removeWhiteSpaces = this.removeWhiteSpaces.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.getAccessToken = this.getAccessToken.bind(this);
      this.getID = this.getID.bind(this);

      this.state = {
       Bio: "",
       Courses: [],
       Email: "",
       Major: "",
       Name: "",
       Skills: [],
       user_id: "",
       edit_skills: false,
       edit_courses: false,
       edit_bio: false, 
       edit_name: false, 
       edit_grad: false,     
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
   this.setState({ redirect: true })
   const _this = this;
   const id = _this.getLocalStorage("id");
   let token = _this.getLocalStorage("token");
    if (this.state.edit_courses && this.state.edit_skills) {
      var skillsarray = this.removeWhiteSpaces(this.state.Skills.split(","));
      var coursesarray = this.removeWhiteSpaces(this.state.Courses.split(",")); 
      var payload = JSON.stringify({
      "userId": id,
      "token": token,
      "bio": this.state.Bio,
      "courses": coursesarray,
      "skills": skillsarray,
      "fullName": this.state.Name,
      "grad_year": this.state.Graduation,
      });
      console.log(payload);
      fetch('http://localhost:8080/update-profile', {
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
          document.getElementById("success").value="Your profile was successfully updated!";
          response.json().then(json => {
            console.log(json);
          });
        } else {
          alert("Error in updating profile");
        }     
      })
    } else if (this.state.edit_courses && !this.state.edit_skills) {
      var coursesarray = this.removeWhiteSpaces(this.state.Courses.split(","));       var payload = JSON.stringify({
      "userId": id,
      "token": token,
      "bio": this.state.Bio,
      "courses": coursesarray,
      "fullName": this.state.Name,
      "grad_year": this.state.Graduation,
      });
      console.log(payload);
      fetch('http://localhost:8080/update-profile', {
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
          document.getElementById("success").value="Your profile was successfully updated!";
          response.json().then(json => {
            console.log(json);
          });
        } else {
          alert("Error in updating profile");
        }     
      })
    } else if (!this.state.edit_courses && this.state.edit_skills) {
      var skillsarray = this.removeWhiteSpaces(this.state.Skills.split(","));
      var payload = JSON.stringify({
      "userId": id,
      "token": token,
      "bio": this.state.Bio,
      "skills": skillsarray,
      "fullName": this.state.Name,
      "grad_year": this.state.Graduation,
      });
      console.log(payload);
      fetch('http://localhost:8080/update-profile', {
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
          document.getElementById("success").value="Your profile was successfully updated!";
          response.json().then(json => {
            console.log(json);
          });
        } else {
          alert("Error in updating profile");
        }     
      })
    } else if (this.state.edit_bio && !this.state.edit_courses && !this.state.edit_skills) {
      var payload = JSON.stringify({
      "userId": id,
      "token": token,
      "bio": this.state.Bio,
      "fullName": this.state.Name,
      "grad_year": this.state.Graduation,
      });
      console.log(payload);
      fetch('http://localhost:8080/update-profile', {
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
          document.getElementById("success").value="Your profile was successfully updated!";
          response.json().then(json => {
            console.log(json);
          });
        } else {
          alert("Error in updating profile");
        }     
      })
    } else if (!this.state.edit_bio && !this.state.edit_courses && !this.state.edit_courses) {
      if (this.state.edit_name && this.state.edit_grad) {
        var payload = JSON.stringify({
          "userId": id,
          "token": token,
          "fullName": this.state.Name,
          "grad_year": this.state.Graduation,
          });
          console.log(payload);
          fetch('http://localhost:8080/update-profile', {
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
              document.getElementById("success").value="Your profile was successfully updated!";
              response.json().then(json => {
                console.log(json);
              });
            } else {
              alert("Error in updating profile");
            }     
          }) 
      } else if (this.state.edit_name && !this.state.edit_grad) {
        var payload = JSON.stringify({
          "userId": id,
          "token": token,
          "fullName": this.state.Name,
          });
          console.log(payload);
          fetch('http://localhost:8080/update-profile', {
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
              document.getElementById("success").value="Your profile was successfully updated!";
              response.json().then(json => {
                console.log(json);
              });
            } else {
              alert("Error in updating profile");
            }     
          }) 
      } else if (this.state.edit_grad && !this.state.edit_name) {
        var payload = JSON.stringify({
          "userId": id,
          "token": token,
          "grad_year": this.state.Graduation,
          });
          console.log(payload);
          fetch('http://localhost:8080/update-profile', {
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
              document.getElementById("success").value="Your profile was successfully updated!";
              response.json().then(json => {
                console.log(json);
              });
            } else {
              alert("Error in updating profile");
            }     
          }) 
      }
    }
    this.setState ({
      edit_courses: false,
      edit_skills: false,
      edit_bio: false,
      edit_name: false,
      edit_grad: false,
    });
   }


   handleChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      });

      document.getElementById("success").value=" ";
        
      if (event.target.className == "FormInput courses form-control") {
        this.setState({
          edit_courses: true
        });
      } else if (event.target.className == "FormInput skills form-control") {
        this.setState({
          edit_skills: true
        });
      } else if (event.target.className == "FormInput bio form-control") {
        this.setState({
          edit_bio: true
        });
      } else if (event.target.className == "FormInput name form-control") {
        this.setState({
          edit_name: true
        });
      } else if (event.target.className == "FormInput graduation") {
        this.setState({
          edit_grad: true
        });
      } 

      console.log(this.state.Graduation);

      document.getElementById("success").textContent="";
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
     <div className="EditProfile">
       <div className="Container">
         <button
           type="button">
           Edit Information
       </button>
       <br/>
       <h4>Hello, {this.state.Name}!</h4>
       <form onSubmit={this.handleSubmit}>
         <div className="Form">
         <ControlLabel>Graduation Year:</ControlLabel>
         <select
            className="FormInput graduation"
            id="Graduation"
            value={this.state.Graduation} 
            onChange={this.handleChange}>
           <option value="2019">2019</option>
           <option value="2020">2020</option>
           <option value="2021">2021</option>
           <option value="2022">2022</option>
         </select>
         <FormGroup controlId="Name" bsSize="large">
         <ControlLabel>Name:</ControlLabel>
             <FormControl
               className="FormInput name"
               autoFocus
               type="text"
               value={this.state.Name}
               onChange={this.handleChange}
             />
          </FormGroup>
     
         <FormGroup controlId="Bio" bsSize="large">
           <ControlLabel>Bio:</ControlLabel>
             <FormControl
               className="FormInput bio"
               autoFocus
               type="text"
               value={this.state.Bio}
               onChange={this.handleChange}
             />
           </FormGroup>
             <FormGroup controlId="Courses" bsSize="large">
           <ControlLabel>Courses:</ControlLabel>
             <FormControl
               className="FormInput courses"
               autoFocus
               type="text"
               value={this.state.Courses}
               onChange={this.handleChange}
             />
           </FormGroup>
             <FormGroup controlId="Skills" bsSize="large">
           <ControlLabel>Skills:</ControlLabel>
             <FormControl
               className="FormInput skills"
               autoFocus
               type="text"
               value={this.state.Skills}
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

export default EditProfile;

