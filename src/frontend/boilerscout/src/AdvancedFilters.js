import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import './AdvancedFilters.css';
import POSTRequest from './POSTRequest'
import Nav from './TopNavBar'

class AdvancedFilters extends Component {
  constructor (props) {
      super(props);

      this.url = 'http://localhost:8080/advanced-filters';;

      this.state = {
        firstName : "",
        lastName : "",
        username : "",
        currentlyEnrolled : false,
        alreadyTaken : false,
        classStandingFreshman : false,
        classStandingSophomore : false,
        classStandingJunior : false,
        classStandingSenior : false,
        major : ""
      };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: true })
    const _this = this;

    console.log(this.state);

    var payload = JSON.stringify({
      "fistName": this.state.firstName,
      "lastName": this.state.lastName,
      "username": this.state.usename,
    });

    if (this.state.DEBUGGING) {
      payload = JSON.stringify({
        "email": "hgfdsdggfdfghgf@purdue.edu",
        "password": "Test1234!",
      });
    }

    const url = this.url;
    const request = new POSTRequest(payload, url);

    request.send(payload);

    console.log("Response ok?: " + request.responseOk());
    console.log(request.getResponse());
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
    
  }

  handleCheckCurentlyEnrolled = (event) => {    
    this.state.currentlyEnrolled = !this.state.currentlyEnrolled;
  }

  handleCheckAlreadyTaken = (event) => {
    this.state.alreadyTaken = !this.state.alreadyTaken;
  }

  handleCheckClassStandingFreshman = (event) => {
    this.state.classStandingFreshman = !this.state.classStandingFreshman;
  }

  handleCheckClassStandingSophomore = (event) => {
    this.state.classStandingSophomore = !this.state.classStandingSophomore;
  }

  handleCheckClassStandingJunior = (event) => {
    this.state.classStandingJunior = !this.state.classStandingJunior;
  }

  handleCheckClassStandingSenior = (event) => {
    this.state.classStandingSenior = !this.state.classStandingSenior;
  }

  handleRadioAll = (event) => {
    this.state.major = "all";
  }

  handleRadioOnlyMine = (event) => {
    this.state.major = "mine";
  }

  handleRadioOnlySpecific = (event) => {
    this.state.major = "specific";
  }

  render() {
    return (
      <div className="AdvancedFilters">   
        <div className="navbar">
          <Nav />
        </div>     
          <div className="Form" className="left" >
            <FormGroup controlId="firstName" bsSize="large" className="padding">
              <ControlLabel>First Name:</ControlLabel>
              <FormControl
                className="FormInput AFForm"
                autoFocus
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="lastName" bsSize="large" className="padding">
              <ControlLabel>Last Name:</ControlLabel>
              <FormControl
                className="FormInput AFForm"
                autoFocus
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="username" bsSize="large" className="padding">
              <ControlLabel>Username:</ControlLabel>
              <FormControl
                className="FormInput AFForm"
                autoFocus
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup>
            <div className="button bottom">
              <form onSubmit={this.handleSubmit}>
                <Button type="submit">
                  Scout
                </Button>  
              </form>    
            </div>
          </div>

          <div className="right">
            <div className="courses">
              <h3>Courses</h3>
              <Checkbox onChange={this.handleCheckCurentlyEnrolled}>
                Currently Enrolled
              </Checkbox>
              <Checkbox onChange={this.handleCheckAlreadyTaken}>
                Already Taken
              </Checkbox>
            </div>
            <div className="class-standing">
              <h3>Class Standing</h3>
              <Checkbox onChange={this.handleCheckClassStandingFreshman}>
                Freshman
              </Checkbox>
              <Checkbox onChange={this.handleCheckClassStandingSophomore}>
                Sophomore
              </Checkbox>
              <Checkbox onChange={this.handleCheckClassStandingJunior}>
                Junior
              </Checkbox>
              <Checkbox onChange={this.handleCheckClassStandingSenior}>
                Senior
              </Checkbox>
            </div>
            <div className="majors">
              <FormGroup>
                <h3>Majors</h3>
                <Radio name="radioGroup" onChange={this.handleRadioAll}>
                  All majors
                </Radio>
                <Radio name="radioGroup" onChange={this.handleRadioOnlyMine}>
                  Only my major
                </Radio>
                <Radio name="radioGroup" onChange={this.handleRadioOnlySpecific}>
                  Only in a specific major
                </Radio>
              </FormGroup>
            </div>        
          </div>
      </div>
    )
  }
}

export default AdvancedFilters;