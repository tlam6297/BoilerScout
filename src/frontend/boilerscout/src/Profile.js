import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, Panel} from "react-bootstrap";
import Logo from './Logo'
import './Profile.css'

class Profile extends Component {
    constructor (props) {
        super(props);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getID = this.getID.bind(this);

        this.state = {
          user_id: "sovali",
          user_fullname: "Selin Ovali",
          user_bio: "Hello!!!1",
          user_skills: "Java, C",
          user_courses: "CS250, CS252",
          user_major: "CS",
        };
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

    render() {
        return (
            <div className="Profile">
                <h1>{this.state.user_id}</h1>
                <Panel>
                    <p id="bio">
                        {this.state.user_bio}
                    </p>
                </Panel>
            </div>
        );
        }
    }

    export default Profile;