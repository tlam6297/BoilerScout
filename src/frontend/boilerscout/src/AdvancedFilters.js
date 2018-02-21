import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import './AdvancedFilters.css';

class AdvancedFilters extends Component {
  constructor (props) {
      super(props);

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
  }

  render() {
      return (
          <div className="AdvancedFilters">
            <div className="Form" class="button top">
            <Link to="/scout"> Go Back To Scout</Link>
            </div>
            <div className="Form" class="left"> 
            <form>
                <FormGroup controlId="first-name" bsSize="large">
                  <ControlLabel>First Name:</ControlLabel>
                  <FormControl
                    className="FormInput AFForm"
                    autoFocus
                    value={this.state.firstName}
                  />
                </FormGroup>
                <FormGroup controlId="last-name" bsSize="large">
                  <ControlLabel>Last Name:</ControlLabel>
                  <FormControl
                    className="FormInput AFForm"
                    autoFocus
                    value={this.state.lastName}
                  />
                </FormGroup>
                <FormGroup controlId="user-name" bsSize="large">
                  <ControlLabel>Username:</ControlLabel>
                  <FormControl
                    className="FormInput AFForm"
                    autoFocus
                    value={this.state.username}
                  />
                </FormGroup>
                </form>
            </div>
            <div class="right">
              <div class="courses">
                <h3>Courses</h3>
                <Checkbox>
                  Currently Enrolled
                </Checkbox>
                <Checkbox>
                  Already Taken
                </Checkbox>
              </div>
              <div class="class-standing">
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
              <div class="majors">
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
                  {/*<DropdownButton
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Action"
                    >
                    <MenuItem key="1">Item</MenuItem>
                    <MenuItem key="2">Item2</MenuItem>
                  </DropdownButton>*/}
              </div>
          </div>
        </div>
    )
  }

}

export default AdvancedFilters;