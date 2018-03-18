import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import './Result.css'

class Result extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const data = this.props.data;
    console.log(data);

    return (
      <div className="result">
        <div className="pic entry">
          {data.picture}
        </div>
        <div className="first entry">
          {data.first}
        </div>
        <div className="last entry">
          {data.last}
        </div>
        <div className="major entry">
          {data.major}
        </div>
      </div>
    )
  }
}

export default Result