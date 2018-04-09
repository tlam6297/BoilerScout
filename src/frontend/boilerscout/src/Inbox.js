import { Component } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from './TopNavBar'
import "./Inbox.css"

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Jacob",
      threads: [{
        "id": "fasdf3hff",
        "preview": "Hey i was just wondering if...",
        "name": "Selin Olive",
        "date": "May 2, 2018",
      }],
    };
  }

  renderTitle = () => {
    return (<h1>Hello, {this.state.name}</h1>)
  }

  renderThreads = () => {
    return (
      <ul>
        {this.state.threads.map((thread, index) =>
          <li id={index}>
            <Link to={{pathname: '/message', search: '?id=' + thread.id,}} className="link">
              <div className="thread">
                <div className="thread-preview">
                  <h3>{thread.preview}</h3>
                </div>
                <div className="thread-author">
                  <h6>{thread.name}</h6>
                </div>
                <div className="time">
                  <h6>{thread.date}</h6>
                </div>
              </div>
            </Link>
          </li>
        )}
      </ul>
    )
  }

  render = () => {
    return (
      <div>
        <Navbar />
        <div className="inbox">
          <div className="title">
            {this.renderTitle()}
          </div>
        
          <div className="threads">
            {this.renderThreads()}
          </div>
        </div>
      </div>
    )
  }
}

export default Inbox;