import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import NavBar from './TopNavBar.js'
import './Community.css'
import axios from 'axios'

class Community extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "",
            userId: "",
            forumId: "",
            forums: [],
        }
    }

    componentDidMount= () => {
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
  render() {
    return (
      <div className="Community">
        <div className="NavBar">
          <NavBar/>
        </div>
        <h2> Community </h2>
        <div class="grid-container-comm forums">
        <ul>
          <div className='li'>
            {this.state.forums.map((result, index) =>
              <Link to={
                  `/community/get-threads?userId=` + result.user_id + `&token=` + result.token + `&forumId=` + result.forumId + `&major=` + result.major + `&year=` + result.grad_year
                } className="link">
                <li key={index}>
                  <div className='result entry'>
                    <div className="first entry">
                      {result.forum_name}
                    </div>
                    <div className="description entry">
                      {result.forum_description}
                    </div>
                  </div>
                </li>
              </Link>
            )}
          </div>
        </ul>
        </div>
        </div>
    );
  }
}

export default Community;