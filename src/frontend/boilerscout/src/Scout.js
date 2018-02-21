import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
            <FormGroup controlId="search" bsSize="large">
              <FormControl
                className="FormInput"
                autoFocus
                type="text"
                value={this.state.searchinput}
                placeholder="Enter a name/class/skill"
                onChange={this.handleChange}
              />
            </FormGroup>
            <div className="Submit">
            <Route render={({ history}) => (
                <button
                    type='button'
                    onClick={() => { history.push('/search') }}
                >
                SCOUT
                </button>
            )} />
            </div>   
       </div>
        );
        }

}

export default Scout;