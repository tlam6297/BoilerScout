import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel, Radio } from "react-bootstrap";
import './Scout.css'
import TopNavBar from './TopNavBar'
import GETRequest from './GETRequest'
import Popup from 'react-popup'

import axios from 'axios';

class Scout extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      url: "",
      searchinput: '',
      showResult: false,
      submitClicked: false,
      redirect: false,
      results: [],
      posts: [],
    };
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // get the user id and the token from localstorage
    const id = this.getLocalStorage("id");
    let token = this.getLocalStorage("token");

    // uncomment this line to test amn invalid token
    //token = "3ffadfadf"

    this.state.url = "http://localhost:8080/scout?" + "userId=" + id + "&token=" + token + "&type=" + this.state.type + "&query=" + this.state.searchinput
    
    // the real get request
    axios.get(this.state.url)
    .then(res => {
      //const posts = res.data.data.children.map(obj => obj.data);
      //this.setState({ posts });
     // console.log(res);
      //console.log(this.state.url)
      console.log(res.data.query);

      if (res.data.status == "OK") {
        
        // Put Results in state
        this.setState({
          results: res.data.query,
        });
        
      } else {
        //console.log(res.data);
        alert("Invalid Token- Please login again");
        this.setState({
          redirect: true,
        })
      }
      
    });

    this.setState({
      submitClicked: true,
    });
  }

  renderResults = () => {
    const redirect_to_url = "/profile?user_id=" + ""
    

    return (
      <div className="results">
        <ul>
          <div className='li'>
            {this.state.results.map((result, index) =>
              <Link to={
                  `/profile?user_id=` + result.user_id + `&name=` + result.full_name + `&bio=` + result.bio + `&major=` + result.major + `year=` + result.grad_year
                } className="link">
                <li key={index}>
                  <div className='result entry'>
                    <div className="first entry">
                      {result.full_name}
                    </div>
                    <div className="major entry">
                      {result.major}
                    </div>
                    <div className="grad entry">
                      Grad Year: {result.grad_year}
                    </div>
                  </div>
                </li>
              </Link>
            )}
          </div>
        </ul>
      </div>
    )    
  }

  handleRadioName = (event) => {
    this.setState({
      type: "name",
    });
  }

  handleRadioOnlySkill = (event) => {
    this.setState({
      type: "skill",
    });
  }

  handleRadioCourse = (event) => {
    this.setState({
      type: "course",
    });
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  render() {
    return (
      <div className="scout">
        <div className="navs">
          <TopNavBar/>
        </div>        
        <form onSubmit={this.handleSubmit} className="form">


        <FormGroup controlId="searchinput" bsSize="large">
            <FormControl
              className="FormInput ScoutForm"
              autoFocus
              type="text"
              placeholder="Enter a name, class, or skill"
              value={this.state.searchinput}
              onChange={this.handleChange}
            />
          </FormGroup>
          <p></p>
          <div className="type">
            <FormGroup>
              <h3>Type:</h3>
              <Radio name="radioGroup" onChange={this.handleRadioName}>
                Name
              </Radio>
              <Radio name="radioGroup" onChange={this.handleRadioOnlySkill}>
                Skill
              </Radio>
              <Radio name="radioGroup" onChange={this.handleRadioCourse}>
                Course
              </Radio>
            </FormGroup>
          </div>
          <Button
              block
              bsSize="small"
              type="submit">
              SUBMIT        
          </Button>
          <p></p>
        </form>

        { this.renderResults() }
        {this.state.redirect && (
          <Redirect to={'/login'}/>   
        )}

        <div className="advanced">
          <Route render={({ history}) => (
            <button
              type='button'
              onClick={() => { history.push('/advanced-filters') }}
            >ADVANCED FILTERS</button>
          )} />
        </div>
      </div>
    );
  }
}

export default Scout;