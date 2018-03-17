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
        <p>
          {data.first}
        </p>
        <p>
          {data.last}
        </p>
      </div>
    )
  }
}

export default Result