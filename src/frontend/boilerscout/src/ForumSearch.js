import React from 'react'
import { Component } from 'react';
import axios from 'axios'
import './ForumSearch.css'

class ForumSearch extends Comment {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  handleSubmit = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render = () => {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit} action="" className="form">
        
        </form>
      </div>
    )
  }

}

export default ForumSearch;