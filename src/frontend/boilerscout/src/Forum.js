import React from 'react'
import { Component } from 'react';
import axios from 'axios'
import './ForumSearch.css'

class Forum extends Component {
  constructor() {
    super(props);

    this.state = {
      title: "Name of forum",
      input: "input..",
      threads: [
        {
          "title": "Cs252 is not good for my life",
          "author": "Terry Lamb",
        },
        {
          "title": "Cant wait to work at an internship",
          "author": "Slein Olive",
        }
      ],
    };
  }

  render = () => {
    return (
      <div className="forum">
        <div className="title">
          <h1>{this.state.title}</h1>
        </div>
        <div className="search">
          <p>seach box goes here</p>
        </div>
        <div className="threads">
          <ul>
            {this.threads.map((thread, index) =>
              <li id={index}>{thread.title}</li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Forum;