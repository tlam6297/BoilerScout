import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, Panel, ControlLabel} from "react-bootstrap";
import Logo from './Logo'
import './Profile.css'
import TopNavBar from './TopNavBar'

class Profile extends Component {
   constructor (props) {
       super(props);
       this.getAccessToken = this.getAccessToken.bind(this);
       this.getProfile = this.getProfile.bind(this);
       this.getID = this.getID.bind(this);

       this.state = {
        user_id: "",
        user_fullname: "",
        user_bio: "",
        user_skills: "",
        user_courses: "",
        user_major: "",
        user_year: "",
      };
     }

   parseFields = (text) => {
       var ans = text.split(" ");
       return ans;
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

   getProfile = () => {
       const payload = JSON.stringify({
           "id": this.getID,
           "token": this.getAccessToken,
       });
       // Endpoint will be different
       fetch('http://localhost:8080/getprofile', {
           method: 'GET',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json;charset=UTF-8',
               'transfer-encoding': 'chunked',
           },
           body: payload,
       })
       .then(function(response) {
           if (response.ok) {
               // Get user info
               // Put them in state
               console.log("GOOD");
           } else {
               throw new Error('Profile Not Found')
           }     
       })   
   }

   componentDidMount = () => {
        // this variable needs to be manipulated to pull the data from it to display!
        const all_data = this.props.location.search;
        const split = all_data.split("&");
        
        let i = 0;
        for (i = 0; i < split.length; i++) {
            const tokens = (split[i].split("="));

            const type = tokens[0];
            
            console.log(tokens[0] + " | " + tokens[1]);

            this.setState({
                [tokens[0]]: tokens[1],
            });
        }
   }

   componentDidUpdate = () => {       

        // see if state was update correcly
        //console.log(this.state);
        console.log(this.state);
   }

   render() {
        return (
               <div className="container">
                   <TopNavBar/>
                   <div className="grid-container">
                       <div className="card grid-item">
                           <h1>{this.state.user_id}</h1>
                           <h4>{this.state.user_fullname}</h4>
                           <div
                               id="labels">
                                   <ControlLabel
                                       id="label">
                                       Major:
                                   </ControlLabel>
                                   <p
                                       id="info">
                                       {this.state.user_major}
                                   </p>
                                   <p></p>
                                   <ControlLabel
                                       id="label">
                                       Class Standing:
                                   </ControlLabel>
                                   <p
                                       id="info">
                                       {this.state.user_year}
                                   </p>    
                           </div>
                       </div>
                       <div className="grid-item">
                           <h1> Bio </h1>
                       </div>
                       <div className="grid-item">
                           <h1> Courses </h1>
                           <div className="grid-container">
                               <h4>Currently Taking</h4>
                               <h4>Already Taken</h4>
                           </div>
                       </div>
                       <div className="grid-item">
                           <h1>Skills </h1>
                       </div>
                   </div>
               </div>
       );
       }
   }

   export default Profile;

