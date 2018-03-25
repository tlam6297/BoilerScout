import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, Nav, NavItem } from "react-bootstrap";
import  './TopNavBar.css'
import logo from './logo.svg'

class TopNavBar extends Component {
 constructor (props) {
   super(props);

   this.state = {
     id: "",
     link: "",
   };
 }

 handleChange = (event) => {
   this.setState({
     [event.target.id]: event.target.value
   });
 }

 handleSubmit = (event) => {
   event.preventDefault();
   this.setState({ redirect: true })
 }

  componentDidMount = () => {
    const user_id = localStorage.getItem('id');
    this.setState({
      id: user_id,
      link: `/profile?user_id=` + user_id,
    });
  }



 render () {
   const style = {
     width: "400px",
     margin: 0,
     padding: 0,
   }

   return (
     <div class="container">
       <div class="grid-container">
         <div class="logo grid-item">
          <a href="/scout">
           <img
             id="mylogo"
             href="/"
             src={logo}
             alt="logo"
           />
          </a>
       </div>
       <div class="grid-item">
         <nav class="nav">
           <a
             class="nav-link"
             href="/scout">
             Scout
           </a>
           <a
             class="nav-link"
             href="/community">
             Community
           </a>
           <a
             class="nav-link"
             href={this.state.link}>
             Profile
           </a>
           <a
             class="nav-link"
             href="/settings">
             Settings
           </a>
         </nav>
       </div>
     </div>
       <p></p>
       <hr/>
     </div>
   )
 }
}

export default TopNavBar;

