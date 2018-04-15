
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import { Button } from "react-bootstrap";
import './CreateAThread.css'
import NavBar from './TopNavBar'
import axios from 'axios'
import PostReply from './PostReply'

class Thread extends Component {
   constructor(props) {
     super(props);
     this.handleChange = this.handleChange.bind(this);
     this.renderComments = this.renderComments.bind(this);
     this.getAccessToken = this.getAccessToken.bind(this);
     this.getID = this.getID.bind(this);
        this.state = {
         threadTitle: "",
         threadBody: "",
         thread: {},
         comments: [],
         threadId: props.location.search.substring(4),
         token: "",
         postBody: "",
         replytoggle: false,
     }

     console.log(this.state.threadId);
   }
  
   // Return user id if signed in, null if not
   signedIn = () => {
     return this.state.signedIn
   }

   componentWillMount = () => {
       const user_id = localStorage.getItem("id");
       const token = localStorage.getItem("token");
       const thread_id = this.state.threadId;
       console.log("userid:" + user_id);
       console.log("token:" + token);
       console.log("threadid:" + thread_id);
       const url = "http://localhost:8080/community/view-thread?userId=" + user_id + "&token=" + token + "&threadId=" + thread_id;
       axios.get(url)
       .then(res => {
           // console.log(res.data.query);
           if (res.data.status == "OK") {
               this.setState({
               comments: res.data.comments,
               thread: res.data.thread[0],
               }); 
               console.log(this.state.comments);
           } else {
               alert("Invalid Token- Please login again");
               this.setState({
               redirect: true,
               })
           }     
       })
       .catch(error => {
         console.log(error);
       }
     );
   }
 
 
   getLocalStorage = (key) => {
     return localStorage.getItem(key);
   }
 
 
 
 
     handleChange = (event) => {
         this.setState({
           [event.target.id]: event.target.value
         });       
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

   toggle = () => {
     this.setState({
         replytoggle: !this.state.replytoggle,
     });
 }

   renderComments = () => {

    return ( <div className="comments">
     <ul>
       <div className='li'>
         {this.state.comments.map((result, index) =>
             <li key={index}>
               <div className='result entry'>
               <Link to={
               `/profile?user_id=` + result.user_id + `&name=` + result.full_name + `&bio=` + result.bio + `&major=` + result.major + `&year=` + result.grad_year
                 } className="link">
                 <div className="first entry">
                   {result.full_name}
                 </div>
                 </Link>
                 <div className="body entry">
                   {result.post_body}
                 </div>
                 <div className="date entry">
                   {result.post_date}
                 </div>
               </div>
             </li>
         )}
       </div>
     </ul>
   </div>
    )
   }
 
   render() {
     return (
       <div className="Container">
       <NavBar/>
         <div className="Thread">
         <p/>
               <div
                   id="threadTitle">
                   {this.state.thread.thread_title}
               </div>
               <p/>
               <div
                   id="threadBody">
                   {this.state.thread.thread_body}
               </div>
               <p/>
         </div>
         <div className="postReply">
         <button
           type="button"
           onClick={this.toggle}>
           Post Reply
         </button>
         {this.state.replytoggle && <PostReply/>}
         </div>
         <div className="Comments">
           {this.renderComments()}
         </div>
       </div>
     )
   }
  }
 
  export default Thread;
 
 

