import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import axios from 'axios'

class EditProfile extends Component {
 constructor() {
   super()
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.getAccessToken = this.getAccessToken.bind(this);
      this.getID = this.getID.bind(this);

      this.state = {
       Bio: "",
       Courses: [],
       Email: "",
       Graduation: "",
       Major: "",
       Name: "",
       Skills: [],
       user_id: "",
       edit_bio: false,
       edit_skills: false,
       edit_courses: false,
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
   // this variable needs to be manipulated to pull the data from it to display!
   //const all_data = this.props.location.search;
   //const split = all_data.split("&");

   //const real_id_with_equals = split[0].substring(1);
   //const rea = real_id_with_equals.split("=");

   // console.log("real id: " + real_id);

   // ONLY get the user id passed.
   // let i = 0;
   // for (i = 0; i < split.length; i++) {
   //     const tokens = (split[i].split("="));

   //     const type = tokens[0];
      
   //     if (type != "?user_id") {
   //         break;
   //     }

   //     let str = tokens[1];
   //     str = str.split('%20').join(' ');
      
   //     //console.log(tokens[0] + " | " + str);

   //     this.setState({
   //         [tokens[0]]: str,
   //     });
   //     const t = this.state.;
   // }

   // this.setState({
   //     user_id: real_id,
   // })
  
   /////////////////////////////////////////////////

   //the do a GET with the user ID

   const user_id = localStorage.getItem("id");
   const token = localStorage.getItem("token");
   // const requested_id = this.state.user_id;

   const url = "http://localhost:8080/profile/get?id=" + user_id + "&token=" + token + "&query=" + user_id;

   axios.get(url)
   .then(res => {
       if (res.status == 200) {
           this.setState({
               ...res.data,
           });       
       } else {
           alert("Invalid Token- Please login again");
           this.setState({
               redirect: true,
           })
       } 
   });
 }



 handleSubmit = (event) => {
   event.preventDefault();
   this.setState({ redirect: true })
   const _this = this;
   const id = _this.getLocalStorage("id");
   let token = _this.getLocalStorage("token");

   if (this.state.edit_bio && this.state.edit_courses && this.state.edit_skills) {
    var skillsarray = this.state.Skills.split(",");
    var coursesarray = this.state.Courses.split(","); 
    var payload = JSON.stringify({
     "userId": id,
     "token": token,
     "bio": this.state.Bio,
    "courses": coursesarray,
     "skills": skillsarray,
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
      // redirect to profile?
      //_this.setState({ redirect: true })

      response.json().then(json => {
        console.log(json);
      });

    } else {
      alert("Error in updating profile");
    }     
  })
  } else if (this.state_bio) {
    if (this.state.edit_courses) {
      var coursesarray = this.state.Courses.split(","); 
      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "bio": this.state.Bio,
       "courses": coursesarray,
      });

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
          // redirect to profile?
          //_this.setState({ redirect: true })
   
          response.json().then(json => {
            console.log(json);
          });
   
        } else {
          alert("Error in updating profile");
        }     
      })
    } else if (this.state.edit_skills) {
      var skillsarray = this.state.Skills.split(",");
      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "bio": this.state.Bio,
        "skills": skillsarray,
      });

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
          // redirect to profile?
          //_this.setState({ redirect: true })
   
          response.json().then(json => {
            console.log(json);
          });
   
        } else {
          alert("Error in updating profile");
        }     
      })
    } else {
      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "bio": this.state.Bio,
      });

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
  } else if (this.state.edit_courses) {
    if (this.state.edit_skills) {
      var skillsarray = this.state.Skills.split(",");
      var coursesarray = this.state.Courses.split(","); 
      var payload = JSON.stringify({
       "userId": id,
       "token": token,
      "courses": coursesarray,
       "skills": skillsarray,
     });

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
        // redirect to profile?
        //_this.setState({ redirect: true })
 
        response.json().then(json => {
          console.log(json);
        });
 
      } else {
        alert("Error in updating profile");
      }     
    })
    } else {
      var coursesarray = this.state.Courses.split(","); 
      var payload = JSON.stringify({
       "userId": id,
       "token": token,
      "courses": coursesarray,
     });

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
  } else if (this.state.edit_skills) {
    var skillsarray = this.state.Skills.split(",");
    var payload = JSON.stringify({
     "userId": id,
     "token": token,
     "skills": skillsarray,
   });

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

  
  /*fetch('http://localhost:8080/update-profile', {
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
   })*/
   }


   handleChange = (event) => {
       this.setState({
         [event.target.id]: event.target.value
       });

       console.log(event.target.className);

       if (event.target.className == "FormInput bio form-control") {
        this.setState({
          edit_bio: true
        });
        console.log("hu");
       } else if (event.target.className == "FormInput courses form-control") {
        this.setState({
          edit_courses: true
        });
      } else if (event.target.className == "FormInput skills form-control") {
        this.setState({
          edit_skills: true
        });
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
     <div className="EditProfile">
       <div className="Container">
       <h4>Hello, {this.state.Name}!</h4>
         <button
           type="button">
           Edit Information
       </button>
       <form onSubmit={this.handleSubmit}>
         <div className="Form">
         <ControlLabel>Graduation Year:</ControlLabel>
         <div className="graduation">
         <select>
           <option value="2019">2019</option>
           <option value="2020">2020</option>
           <option value="2021">2021</option>
           <option value="2022">2022</option>
         </select>
         </div>   
     
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
         </div>
       </form>
       </div>
     </div>
   )
 }
}

export default EditProfile;

