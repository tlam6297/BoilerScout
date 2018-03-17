import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Scout.css'
import TopNavBar from './TopNavBar'
import GETRequest from './GETRequest'
import Result from './Result'

class Scout extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchinput: '',
      showResult: false,
    };
  }
  
  handleChange(e) {
    this.setState({searchinput: e.target.searchinput});
    
  }

  handleSubmit = (e) => {
    //const get = new GETRequest('http://localhost:8080/scout');
    e.preventDefault();

    const firstName = "jacob"
    const lastName = "mmmmmmmizeee"
    const maj = "Computer Science"
    const yearr = "Sophomore"

    this.setState({
      showResult: true,
      first: firstName,
      last: lastName,
      major: maj,
      year: yearr,
    });
  }

  render() {
    return (
      <div className="Scout">
        {/*<TopNavBar/>*/}
        <form onSubmit={this.handleSubmit}>
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
          <Button
              block
              bsSize="small"
              type="submit">
              SUBMIT        
            </Button>
            <p></p>
          </form>

          {this.state.showResult ?
            <Result data={this.state}/> :
            null
          }

          <Route render={({ history}) => (
            <button
              type='button'
              onClick={() => { history.push('/advanced-filters') }}
            >ADVANCED FILTERS</button>
          )} />  
      </div>
    );
  }
}

export default Scout;