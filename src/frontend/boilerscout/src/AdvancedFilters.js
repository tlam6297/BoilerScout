import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

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
            <div className="Form">
                <form onSubmit={this.handleSubmit}>
                  <Button
                    block
                    bsSize="small"
                    type="submit">
                    SCOUT        
                  </Button>
                  <FormGroup controlId="first-name" bsSize="large">
                    <ControlLabel>First Name:</ControlLabel>
                    <FormControl
                      className="FormInput"
                      autoFocus
                      value={this.state.firstName}
                    />
                  </FormGroup>
                  <FormGroup controlId="last-name" bsSize="large">
                    <ControlLabel>Last Name:</ControlLabel>
                    <FormControl
                      className="FormInput"
                      autoFocus
                      value={this.state.lastName}
                    />
                  </FormGroup>
                  <FormGroup controlId="user-name" bsSize="large">
                    <ControlLabel>Username:</ControlLabel>
                    <FormControl
                      className="FormInput"
                      autoFocus
                      value={this.state.username}
                    />
                  </FormGroup>
                </form>
            </div>
          </div>
      )
  }

}

export default AdvancedFilters;