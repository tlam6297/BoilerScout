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
      results: [{
        firstName: "bonxie",
        lastName: "trumper",
        maj: "political science",
        yearr: "Senior",
      }],
    };
  }
  
  handleChange(e) {
    this.setState({searchinput: e.target.searchinput});    
  }

  handleSubmit = (e) => {
    //const get = new GETRequest('http://localhost:8080/scout');
    e.preventDefault();

    const testData = {
      firstName: "jacob",
      lastName: "mmmmmmmizeee",
      maj: "Computer Science",
      yearr: "Sophomore",
    }

    const numberOfResults = 2;

    // Add new object to list of objects in state
    this.setState((prevState, props) => {
      const test = prevState.results;
      test.push(testData);
      return {results: test};
    });    
  }

  renderResults = () => {
    return (
      <div className="results">
        {this.state.results.forEach(function(data) {
          return <p>hello1</p>;
        })}
      </div>
    )
  }

  renderResultsOld = () => {
    var stateList = [this.state.first, this.state.last, this.state.major, this.state.year];
    var info = stateList.map(function(dataPoint){
      return <li>{dataPoint}</li>;
    })

    return  <ul>{ info }</ul>
  }

  render() {
    return (
      <div className="scout">
        <div className="nav">
          <TopNavBar/>
        </div>        
        <form onSubmit={this.handleSubmit} className="form">
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

        {this.renderResults()}

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