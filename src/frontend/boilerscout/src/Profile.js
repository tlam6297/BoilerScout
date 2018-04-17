import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, Panel, ControlLabel} from "react-bootstrap";
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
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
				open: false,
				reply: "",
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
	 
	 getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

   onCloseModal = () => {
        this.setState({ open: false, reply: "", });
    };

		handleSubmit = (e) => {
			e.preventDefault();

			const _this = this;
	
			const id = this.getLocalStorage("id");
			let token = this.getLocalStorage("token"); 
	
			const payload = JSON.stringify ({
				"userId": id,
				"token": token,
				"recipientEmail": this.state.Email,
				"messageBody": this.state.reply,
			})

			console.log(payload)
	
			//send POST
			fetch('http://localhost:8080/send-message', {
					method: 'POST',
					headers: {
						'Accept': 'application/json;charset=UTF-8',
						'Content-Type':'application/json;charset=UTF-8'
					},
					body: payload
				})
				.then(function(response) {
					if (response.ok) {
						alert("Message Sent");
					} else {
						alert("Message not sent");
					}
				})
		}

		validateForm = () => {
			return (this.state.reply.length > 0);
		}

		renderModal = () => {
			const { open } = this.state;
	
			return (
				<Modal
					open={open}
					onClose={this.onCloseModal}
					little
					classNames={{
						transitionEnter: 'transition-enter',
						transitionEnterActive: 'transition-enter-active',
						transitionExit: 'transition-exit-active',
						transitionExitActive: 'transition-exit-active',
					}}
					animationDuration={1000}
				>
					<h2 className="padding">To: {this.state.Name}</h2>
					<p className="padding">
						{this.state.body}
					</p>
					
					<form onSubmit={this.handleSubmit} className="padding">
						<label>
							<p className="">Compose Message:</p>
							<textarea rows="4" cols="104" onChange={this.handleChangeInput}>{this.state.reply}</textarea>
						</label>
						<button type="submit" value="Submit" disabled={!this.validateForm}>SEND</button>
					</form>
				</Modal>
			)
		}
	
		handleChangeInput = (event) => {
			this.setState({
				reply: event.target.value
			});
		}

   getID = () => {
       // The type of token might be JSON
       const id = localStorage.getItem("id");
       if (!id) {
           throw new Error('No ID Found');
       }
       return id;
   }

    componentWillMount = () => {
        // this variable needs to be manipulated to pull the data from it to display!
        const all_data = this.props.location.search;
        const split = all_data.split("&");

        const real_id_with_equals = split[0].substring(1);
        const rea = real_id_with_equals.split("=");

        const real_id = rea[1];
        
        /////////////////////////////////////////////////

        //the do a GET with the user ID

        const user_id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        // const requested_id = this.state.user_id;

        const url = "http://localhost:8080/profile/get?id=" + user_id + "&token=" + token + "&query=" + real_id;

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

        //console.log(this.state);
    }

    componentDidUpdate = () => {
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
                                       Email: &nbsp;
                                   </ControlLabel>
                                   <p
                                       id="info">
                                       {this.state.Email}
                                   </p>
																	 <p></p>
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
																	 <p></p>
                           </div>
                           <div className="send"
													 			onClick={() => {
																	this.setState({
																		open: true,
																	});
																 }}
													 >
                             <Button>
                                 Send a message
                             </Button>
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
									 {this.renderModal()}
               </div>
       );
       }
   }

   export default Profile;

