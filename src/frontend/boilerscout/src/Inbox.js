import { Component } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from './TopNavBar'
import { Button, FormGroup, FormControl, ControlLabel, } from "react-bootstrap";
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import "./Inbox.css"

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Jacob",
      open: false,
      threads: [{
        "id": "fasdf3hff",
        "body": "Hey i was just wondering if...",
        "name": "Selin Olive",
        "date": "May 2, 2018",
      }],
      title: "",
      author: "",
      body: "",
      reply: "",
      input: "",
      buttonText: "Descending",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount = () => {
    axios.get()
  }

  onCloseModal = () => {
    this.setState({ open: false, reply: "", });
  };

  renderTitle = () => {
    return (<h1>Hello, {this.state.name}</h1>)
  }

  validateForm = () => {
    return (this.state.reply.length > 0);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm() == false) { return; }
    const _this = this;

    //send POST
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeInput = (event) => {
    this.setState({
      reply: event.target.value
    });
  }

  getPreview = (text) => {
    if (text.length < 30) { return text; }

    let str = text.substring(0, 30);
    str += "..";

    return str;
  }

  removeDuplicates = (array) => {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array.length; j++) {
        if (JSON.stringify(array[i]) === JSON.stringify(array[j]) && i != j) {
          array.splice(i, 1);
        }
      }
    }
  }

  getSearchResults = () => {
    let searchResultsName = this.state.threads.filter((thread) => {
      return thread.name.toLowerCase().indexOf(this.state.input.toLowerCase()) != -1;
    });

    let searchResultsBody = this.state.threads.filter((thread) => {
      return thread.body.toLowerCase().indexOf(this.state.input.toLowerCase()) != -1;
    });

    const searchResults = searchResultsName.concat(searchResultsBody);
    this.removeDuplicates(searchResults);

    return searchResults;
  }

  handleSort = (e) => {
    e.preventDefault();
    if (this.state.buttonText == "Descending") {
      this.setState({ buttonText: "Ascending" });
    } else {
      this.setState({ buttonText: "Descending" })
    }
  }

  renderModal = () => {
    const { open } = this.state;

    return (
      <Modal
        open={open}
        onClose={this.onCloseModal}
        little
        classNames={{
          transitionEnter: 'transition-enter',
          transitionEnterActive: 'transition-enter-active',
          transitionExit: 'transition-exit-active',
          transitionExitActive: 'transition-exit-active',
        }}
        animationDuration={1000}
      >
        <h2 className="padding">From: {this.state.author}</h2>
        <p className="padding">
          {this.state.body}
        </p>
        
        <form onSubmit={this.handleSubmit} className="padding">
          <label>
            <p className="">Reply:</p>
            <textarea rows="4" cols="104" onChange={this.handleChangeInput}>{this.state.reply}</textarea>
          </label>
          <button type="submit" value="Submit" disabled={!this.validateForm}>SEND</button>
        </form>
      </Modal>
    )
  }

  renderThreads = () => {
    const searchResults = this.getSearchResults();

    if (searchResults.length == 0) {
      return (
        <div className="noResults">
          <h2>No Results</h2>
        </div>
      )
    }

    return (
      <ul>
        {searchResults.map((thread, index) =>
          <li id={index}>
            <div onClick={() => {
                this.setState({
                  open: true,
                  author: thread.name,
                  body: "So a customer came in, and the shoes suited him so well that he willingly paid a price higher than usual for them; and the poor shoemaker, with the money, bought leather enough to make two pairs more. In the evening he cut out the work, and went to bed early, that he might get up and begin betimes next day; but he was saved all the trouble, for when he got up in the morning the work was done ready to his hand. So can we meet?",
                });
              }}>
              <div className="thread">
                <div className="thread-preview">
                  <h3>{this.getPreview(thread.body)}</h3>
                </div>
                <div className="thread-author">
                  <h6>{thread.name}</h6>
                </div>
                <div className="time">
                  <h6>{thread.date}</h6>
                </div>
              </div>
            </ div>
          </li>
        )}
        {this.renderModal()}
      </ul>
    )
  }

  renderSearch = () => {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <FormGroup controlId="input" bsSize="large">
          <FormControl
            className="FormInput"
            autoFocus
            type="text"
            bsSize="large"
            placeholder="Search for a message..."
            value={this.state.input}
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    )
  }

  renderSort = () => {
    return (
      <button onClick={this.handleSort}>SORT {this.state.buttonText}</button>
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
          <div className="search">
            {this.renderSearch()}
          </div>
          <div className="sort">
            {this.renderSort()}
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