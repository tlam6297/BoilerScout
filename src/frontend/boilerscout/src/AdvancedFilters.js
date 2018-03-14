import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import './AdvancedFilters.css';
import POSTRequest from './POSTRequest'

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
        classStanding : "freshman",
        major : ""
      };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: true })
    const _this = this;

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
    console.log(this.state);
  }

  render() {
    return (
      <div className="AdvancedFilters">
        <form onSubmit={this.handleSubmit}>
          <div className="Form" className="left">
            <FormGroup controlId="firstName" bsSize="large">
              <ControlLabel>First Name:</ControlLabel>
              <FormControl
                className="FormInput AFForm"
                autoFocus
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="lastName" bsSize="large">
              <ControlLabel>Last Name:</ControlLabel>
              <FormControl
                className="FormInput AFForm"
                autoFocus
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username:</ControlLabel>
              <FormControl
                className="FormInput AFForm"
                autoFocus
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>

          <div className="right">
            <div className="courses">
              <h3>Courses</h3>
              <Checkbox>
                Currently Enrolled
              </Checkbox>
              <Checkbox>
                Already Taken
              </Checkbox>
            </div>
            <div className="class-standing">
              <h3>Class Standing</h3>
              <Checkbox>
                Freshman
              </Checkbox>
              <Checkbox>
                Sophomore
              </Checkbox>
              <Checkbox>
                Junior
              </Checkbox>
              <Checkbox>
                Senior
              </Checkbox>
            </div>
            <div className="majors">
              <h3>Majors</h3>
              <Radio>
                All majors
              </Radio>
              <Radio>
                Only my major
              </Radio>
              <Radio>
                Only in a specific major
              </Radio>
            </div>
          </div>
          <div className="button bottom">
            <Button type="submit">
              Scout
            </Button>      
          </div>          
        </form>
      </div>
    )
  }
}

export default AdvancedFilters;