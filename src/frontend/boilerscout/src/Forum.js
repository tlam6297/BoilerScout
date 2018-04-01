import React from 'react';
import { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios'
import Nav from './TopNavBar'
import './Forum.css'

class Forum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Complaining Forum",
      description: "Let's all meet up and complain about stuff",
      input: "",
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

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  componentDidUpdate = () => {
    // console.log(this.state.input);
  }

  render = () => {
    return (
      <div>
        <Nav />
          <div className="forum">
            <div className="heading">
              <div className="title">
                <h1>{this.state.title}</h1>
              </div>
              <div className="descp">
                {this.state.description}
              </div>
            </div>
          <div className="search">
            <form onSubmit={this.handleSubmit} className="form">
              <FormGroup controlId="input" bsSize="large">
                <FormControl
                  className="FormInput"
                  autoFocus
                  type="text"
                  bsSize="large"
                  placeholder="Search for a thread..."
                  value={this.state.input}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </form>
          </div>
          <div className="threads">
            <ul>
              {this.state.threads.map((thread, index) =>
                <li id={index}>
                  <div className="thread">
                    <div className="thread-title">
                      <h3>{thread.title}</h3>
                    </div>
                    <div className="thread-author">
                      <h6>{thread.author}</h6>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Forum;