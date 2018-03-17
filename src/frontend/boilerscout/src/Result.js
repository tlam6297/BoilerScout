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

    return (
      <div className="result">
        <div className="pic">
          {data.picture}
        </div>
        <div className="first">
          {data.first}
        </div>
        <div className="last">
          {data.last}
        </div>
        <div className="major">
          {data.major}
        </div>
      </div>
    )
  }
}

export default Result