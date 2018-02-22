import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Scout.css'
import TopNavBar from './TopNavBar'


class Scout extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchinput: ''
    };
  }
  
  handleChange(e) {
    this.setState({searchinput: e.target.searchinput});
  }

  render() {
    return (
      <div className="Scout">
        <TopNavBar/>
        <FormGroup controlId="search" bsSize="large">
          <FormControl
            className="FormInput ScoutForm"
            autoFocus
            type="text"
            value={this.state.searchinput}
            placeholder="Enter a name, class, or skill"
            onChange={this.handleChange}
          />
        </FormGroup>
        <p></p>
        <div className="Submit">
          <Route render={({ history}) => (
            <button
              className='scoutbutton'
              type='button'
              onClick={() => { history.push('/search') }}
            >
            SCOUT
            </button>
          )} />
          <p></p>
        </div>
          <Route render={({ history}) => (
            <button
              type='button'
              onClick={() => { history.push('/advanced-filters') }}
            >
              ADVANCED FILTERS
            </button>
        )} />  
      </div>
    );
  }
}

export default Scout;