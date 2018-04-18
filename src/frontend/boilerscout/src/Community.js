import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import NavBar from './TopNavBar.js'
import './Community.css'
import axios from 'axios'
import Forum from './Forum.js'
class Community extends Component {
   constructor(props) {
       super(props);
       this.saveForumInfo = this.saveForumInfo.bind(this);

       this.state = {
           token: "",
           userId: "",
           forumId: "",
           forums: [],
       }
   }

   componentWillMount= () => {
       const all_data = this.props.location.search;
       const split = all_data.split("&");

       const real_id_with_equals = split[0].substring(1);
       const rea = real_id_with_equals.split("=");

       const real_id = rea[1];

       const user_id = localStorage.getItem("id");
       const token = localStorage.getItem("token");

       const url = "http://localhost:8080/community?userId=" + user_id + "&token=" + token;

       axios.get(url)
       .then(res => {
           //console.log(res.data);
           if (res.status == 200) {
               this.setState({
                   forums: res.data.forums,
                   userId: res.data.userId,
                   token: res.data.token,
               });       
           } else {
               alert("Invalid Token- Please login again");
               this.setState({
                   redirect: true,
               })
           }     
       });

   }

   saveForumInfo = (event) => {
     let key = event.target.parentNode.parentNode.getAttribute("id");
     let id = this.state.forums[key].forum_id;
     let name = this.state.forums[key].forum_name;
     let description = this.state.forums[key].forum_description;
     localStorage.setItem('forum_id', id);
     localStorage.setItem('forum_title', name);
     localStorage.setItem('forum_description', description);
   }

 render() {
   return (
     <div className="Community">
       <div className="NavBar">
         <NavBar/>

       </div>
       <div className="onlyCommunity">
       <h2> Community </h2>
       <div class="grid-container-comm comm">
         <ul class="commlist">
           {this.state.forums.map((result, index) =>
               <li className="listcommunity" id={index}>
                <Link to={
               `/forum/`}>
                   <div className="name-ent ent" onClick={this.saveForumInfo}>
                     {result.forum_name}
                   </div>
               </Link>
               <div className="description ent">
                     {result.forum_description}
                   </div>
               </li>
           )}
        </ul>
         </div>
       </div>
       </div>
   );
 }
}

export default Community;



