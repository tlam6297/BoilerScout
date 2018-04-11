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
        "message_id": "fasdf3hff",
        "message_body": "Hey i was just wondering if...",
        "full_name": "Selin Olive",
        "email": "dfs2purdu.edu",
        "message_date": "May 2, 2018",
      }],
      title: "",
      author: "",
      body: "",
      reply: "",
      input: "",
      email: "",
      name: "",
      buttonText: "Descending",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  componentDidUpdate () {
   // console.log(this.state);
  }

  componentWillMount = () => {
    this.getInitialMessages();
    this.setName();
  }

  getInitialMessages = () => {
    const id = this.getLocalStorage("id");
    let token = this.getLocalStorage("token");

    const url = "http://localhost:8080/inbox?" + "userId=" + id + "&token=" + token;

    axios.get(url)
    .then(res => {
      this.setState({
        threads: res.data.inbox,
      })      
    });
  }

  setName = () => {
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const url = "http://localhost:8080/profile/get?id=" + user_id + "&token=" + token + "&query=" + user_id;

    axios.get(url)
    .then(res => {
        console.log(res.data);
        if (res.status == 200) {
            this.setState({
                name: res.data.Name,
            });        
        } else {
            alert("error");
        }      
    });
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

    const id = this.getLocalStorage("id");
    let token = this.getLocalStorage("token"); 

    const payload = JSON.stringify ({
      "userId": id,
      "token": token,
      "recipientEmail": this.state.email,
      "messageBody": this.state.reply,
    })

    //send POST
    fetch('http://localhost:8080/send-message', {
        method: 'POST',
        headers: {
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type':'application/json;charset=UTF-8'
        },
        body: payload
      })
      .then(function(response) {
        if (response.ok) {
          alert("Message Sent");
        } else {
          alert("Message not sent");
        }
      })
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
    if (this.state.threads != undefined) {
      let searchResultsName = this.state.threads.filter((thread) => {
        return thread.full_name.toLowerCase().indexOf(this.state.input.toLowerCase()) != -1;
      });
  
      let searchResultsBody = this.state.threads.filter((thread) => {
        return thread.message_body.toLowerCase().indexOf(this.state.input.toLowerCase()) != -1;
      });
  
      const searchResults = searchResultsName.concat(searchResultsBody);
      this.removeDuplicates(searchResults);
  
      return searchResults;
    } else {
      return (
        []
      )
    }
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
          <h2>No Messages</h2>
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
                  author: thread.full_name,
                  body: thread.message_body,
                  email: thread.email,
                });
              }}>
              <div className="thread">
                <div className="thread-preview">
                  <h3>{this.getPreview(thread.message_body)}</h3>
                </div>
                <div className="thread-author">
                  <h6>{thread.full_name}</h6>
                </div>
                <div className="time">
                  <h6>{thread.message_date}</h6>
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