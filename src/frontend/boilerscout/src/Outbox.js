import { Component } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from './TopNavBar'
import { Button, FormGroup, FormControl, ControlLabel, } from "react-bootstrap";
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import "./Outbox.css"

class Outbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "     ",
      open: false,
      threads: [],
      title: "",
      author: "",
      body: "",
      reply: "",
      input: "",
      email: "",
      name: "",
      order: "ASC",
      buttonText: "Ascending",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  componentDidUpdate () {
   // console.log(this.state);
  }

  componentWillMount = () => {
    this.setName();
    this.getInitialMessages();
  }

  getInitialMessages = () => {
    const id = this.getLocalStorage("id");
    let token = this.getLocalStorage("token");

    const url = "http://localhost:8080/outbox?" + "userId=" + id + "&sort=" + this.state.order + "&token=" + token;
    console.log(url)
    axios.get(url)
    .then(res => {
      this.setState({
        threads: res.data.userOutbox,
      })      
    });
  }

  setName = () => {
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const url = "http://localhost:8080/profile/get?id=" + user_id + "&token=" + token + "&query=" + user_id;

    axios.get(url)
    .then(res => {
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

  compare = (a, b) => {
    if (a.message_date < b.message_date) { return -1; }
    if (a.message_date > b.message_date) { return 1; }
    return 0;
  }

  compareASC = (a, b) => {
    if (a.message_date > b.message_date) { return -1; }
    if (a.message_date < b.message_date) { return 1; }
    return 0;
  }

  handleSort = (e) => {
    e.preventDefault();

    const threads = this.state.threads;

    if (this.state.buttonText == "Descending") {      
      threads.sort(this.compare);
      this.setState({
        buttonText: "Ascending",
        order: "ASC",
        threads: threads,
      });
    } else {
      threads.sort(this.compareASC);
      this.setState({
        buttonText: "Descending",
        order: "DESC",
        threads: threads,
      })
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
        <h2 className="padding">To: {this.state.author}</h2>
        <p className="padding">
          {this.state.body}
        </p>
      </Modal>
    )
  }

  renderThreads = () => {
    const searchResults = this.getSearchResults();

    if (this.state.order == "ASC") {
      searchResults.sort(this.compareASC)
    } else {
      searchResults.sort(this.compare)
    }

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
          <li key={index}>
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
      <form className="form">
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
        <div className="outbox">
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

export default Outbox;