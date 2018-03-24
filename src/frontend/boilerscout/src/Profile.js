import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, Panel, ControlLabel} from "react-bootstrap";
import Logo from './Logo'
import './Profile.css'
import TopNavBar from './TopNavBar'
import axios from 'axios'

class Profile extends Component {
   constructor (props) {
       super(props);
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

    componentDidMount = () => {
        // this variable needs to be manipulated to pull the data from it to display!
        const all_data = this.props.location.search;
        const split = all_data.split("&");

        const real_id_with_equals = split[0].substring(1);
        const rea = real_id_with_equals.split("=");

        const real_id = rea[1];
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

        const url = "http://localhost:8080/profile/get?id=" + user_id + "&token=" + token + "&query=" + real_id;

        axios.get(url)
        .then(res => {
            console.log(res);
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

        console.log(this.state);

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
                           <h1>{this.state.Name}</h1>
                           <div
                               id="labels">
                                   <ControlLabel
                                       id="label">
                                       Major: &nbsp;
                                   </ControlLabel>
                                   <p
                                       id="info">
                                       {this.state.Major}
                                   </p>
                                   <p></p>
                                   <ControlLabel
                                       id="label">
                                       Graduation Year: &nbsp;
                                   </ControlLabel>
                                   <p
                                       id="info">
                                       {this.state.Graduation}
                                   </p>
                           </div>
                       </div>
                       <div className="grid-item">
                           <h1> Bio </h1>
                           <h3>{this.state.Bio}</h3>
                       </div>
                       <div className="grid-item">
                           <h1> Courses </h1>
                           <div className="grid-container">                                
                                <div className="results">
                                    <ul>
                                        <div className='li'>
                                            {this.state.Courses.map((result, index) =>
                                                <li key={index}>
                                                    {result}
                                                </li>
                                            )}
                                        </div>
                                    </ul>
                                </div>                               
                           </div>
                       </div>
                       <div className="grid-item">
                           <h1>Skills </h1>
                           <div className="grid-container">                                
                                <div className="results">
                                    <ul>
                                        <div className='li'>
                                            {this.state.Skills.map((result, index) =>
                                                <li key={index}>
                                                    {result}
                                                </li>
                                            )}
                                        </div>
                                    </ul>
                                </div>                               
                           </div>
                       </div>
                   </div>
               </div>
       );
       }
   }

   export default Profile;

