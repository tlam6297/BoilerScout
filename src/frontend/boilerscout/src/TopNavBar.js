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
     <div className="container">
       <div className="grid-container">
         <div className="logo grid-item">
          <a href="/scout">
           <img
             id="mylogo"
             href="/"
             src={logo}
             alt="logo"
           />
          </a>
       </div>
       <div className="grid-item">
         <nav className="nav">
           <a
             className="nav-link"
             href="/scout">
             Scout
           </a>
           <a
             className="nav-link"
             href="/community">
             Community
           </a>
           <a
             className="nav-link"
             href={this.state.link}>
             Profile
           </a>
           <a
             className="nav-link"
             href="/settings">
             Settings
           </a>
           <a
             className="nav-link"
             href="/logout">
             Logout
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