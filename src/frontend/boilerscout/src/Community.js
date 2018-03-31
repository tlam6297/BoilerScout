import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import NavBar from './TopNavBar.js'
import './Community.css'

class Community extends Component {
  render() {
    return (
      <div className="Community">
        <div className="NavBar">
          <NavBar/>
        </div>
        <div class="grid-container-comm">
            <h2> Community </h2>
            <div class="grid-item">
                <Route render={({ history }) => (
                    <button
                    type='button'
                    onClick={() => { history.push('/class-help') }}
                    >
                        Class Help
                    </button>
                )} />
            </div>
            <div class="grid-item">
                <Route render={({ history }) => (
                    <button
                    type='button'
                    onClick={() => { history.push('/mentor-search') }}
                    >
                       Mentor Search
                    </button>
                )} />
            </div>
            <div class="grid-item">
                <Route render={({ history }) => (
                    <button
                    type='button'
                    onClick={() => { history.push('/project-ideas') }}
                    >
                       Project Ideas
                    </button>
                )} />
            </div>
            <div class="grid-item">
                <Route render={({ history }) => (
                    <button
                    type='button'
                    onClick={() => { history.push('/tutor-search') }}
                    >
                       Tutor Search
                    </button>
                )} />
            </div>
        </div>
        </div>
    );
  }
}

export default Community;