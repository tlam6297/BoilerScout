import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios'
import Nav from './TopNavBar'
import './Forum.css'
import ReactDOM from 'react-dom';
import Modal from "react-responsive-modal";
import CreateAThread from './CreateAThread';
class Forum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      input: "",
      found: false,
      displayTitle: true,
      threads: [],
      open:false,
    };
  }

  handleChange = (event) => {
    //console.log(this.state);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  //setLocalStorage
  setLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
  }

  componentDidUpdate = () => {
    // console.log(this.state.input);
  }

  getThreads = () => {
    const id = this.getLocalStorage("id");
    let token = this.getLocalStorage("token");

    //get forum ID from localStorage (dummy forum ID for now)
    let forum_id = "528fc18a-ebbc-4b0a-9ca3-bd00d6db006c";
    //forum_id = this.getLocalStorage("forum_id");

    const url = "http://localhost:8080/community/get-threads?userId=" + id + "&token=" + token + "&forumId=" + forum_id;    

    axios.get(url)
    .then(res => {
      if (res.data.threads.length < 1) { 
        this.setState({
          found: true,
          displayTitle: false,
        }) 
      } else {
        let title1 = "Complaining Forum";
        title1 = this.getLocalStorage("forum_title");

        let desp = "Let's all meet up and complain about stuff";
        desp = this.getLocalStorage("forum_description");

        this.setState({
          title: title1,
          description: desp,
        });
      }
      this.setState({
        threads: res.data.threads,
      });      
    });  
  }

  // Make page while loading
  componentWillMount = () => {
    this.getThreads();
  }

  render = () => {
    let searchResults = this.state.threads.filter( (thread) => {
      const input_lower = this.state.input.toLowerCase();
      return thread.thread_title.toLowerCase().indexOf(input_lower) != -1;
    });
    
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
              <button onClick={this.onOpenModal}>Create Thread</button>
              <Modal open={this.state.open} onClose={this.onCloseModal} little>
                <CreateAThread/>
              </Modal>
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
              {this.state.found && (
                <div className="noResults">
                  <h4>Forum does not exist</h4>
                </div>
              )}
              <ul>
                {searchResults.map((thread, index) =>
                  <li id={index}>
                    <Link to={{pathname: '/view-thread', search: '?id=' + thread.thread_id,}} className="link">
                      <div className="thread">
                        <div className="thread-title">
                          <h3>{thread.thread_title}</h3>
                        </div>
                        <div className="thread-author">
                          <h6>{thread.full_name}</h6>
                        </div>
                        <div className="time">
                          <h6>{thread.thread_date}</h6>
                        </div>
                      </div>
                    </Link>
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