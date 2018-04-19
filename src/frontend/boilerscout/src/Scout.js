import React from 'react'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel, Radio, DropdownButton, MenuItem } from "react-bootstrap";
import './Scout.css'
import TopNavBar from './TopNavBar'
import GETRequest from './GETRequest'
import axios from 'axios';

class Scout extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      url: "",
      searchinput: '',
      type: 'name',
      showResult: false,
      submitClicked: false,
      redirect: false,
      advanced: false,
      advText: "ADVANCED FILTERS",
      selectedMajor: "",
      selectedYear: "",
      noResults: true,
      results: [],
      posts: [],
    };
  }

  componentDidMount = () => {
    console.log("Checking if valid token...")
    axios.get("http://localhost:8080/verify-authentication?" + "userId=" + localStorage.getItem("id") + "&token=" + localStorage.getItem("token"))
  
    .then(res => {
      if (res.data == false) {
        console.log("Not valid token")
        this.setState({
          redirect: true,
        })
      } else {
        console.log("Valid Token")
        this.setState({
          redirect: false,
        })
      }
    })
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeYear = (e) => {
    this.setState({
      selectedYear: e.target.value,
    });
  }

  handleChangeMajor = (e) => {
    this.setState({
      selectedMajor: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // if (this.state.searchinput == '') {
    //   this.setState({
    //     results: [],
    //   })
    //   return;
    // }
    
    const id = this.getLocalStorage("id");
    let token = this.getLocalStorage("token");

    // uncomment this line to test amn invalid token
    //token = "3ffadfadf"
    let url = "http://localhost:8080/scout?" + "userId=" + id + "&token=" + token + "&type=" + this.state.type + "&query=" + this.state.searchinput

    this.state.url = "http://localhost:8080/scout?" + "userId=" + id + "&token=" + token + "&type=" + this.state.type + "&query=" + this.state.searchinput


    
    if (this.state.advanced == true) {

      console.log(this.state.selectedYear !== "")
      if (this.state.selectedYear !== "") {
        url = url + "&graduation=" + this.state.selectedYear
      }

      if (this.state.selectedMajor !== "") {
          url = url + "&major=" + this.state.selectedMajor
      }
      //this.state.url = oldURL + "&graduation=" + this.state.selectedYear + "&major=" + this.state.selectedMajor;
      
    }

    
    console.log(url)
    // get request
    axios.get(url)
    .then(res => {
      // console.log(res.data.query);
      if (res.data.status == "OK") {
        this.setState({
          results: res.data.query,
        });

        // if results is longer than 0, means we do have results
        if (res.data.query.length > 0) {
          this.setState({
            noResults: false,
          });      
        }  
      } else {
        alert("Invalid Token- Please login again");
        this.setState({
          redirect: true,
        })
      }      
    });

    this.setState({
      submitClicked: true,
    });
  }

  renderResults = () => {
    if (this.state.results.length == 0) {
      return (
        <div className="noResults">
          <h2>No Results</h2>
        </div>
      )
    }
    return (
      <div className="results">
        <ul>
          <div className='li'>
            {this.state.results.map((result, index) =>
                <li key={index} className="listelem">
                    <Link key={index} to={
                  `/profile?user_id=` + result.user_id
                } className="link">
                <div className="first entry">
                      {result.full_name}
                    </div>
                    </Link>
                    <div className="major entry">
                      {result.major}
                    </div>
                    <div className="grad entry">
                      Grad Year: {result.grad_year}
                    </div>
                </li>
            )}
          </div>
        </ul>
      </div>
    )    
  }

  renderAdvanced = () => {
    const majors = [
      "",
      "Computer Science",
      "Anthropology",
      "Mechanical Engineering",
      "Chemical Engineering",
      "Biology",
      "Management",
      "Computer Engineering",
      "Materials Engineering",
    ];

    const grad_years = [
      "",
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
    ];

    if (this.state.advanced) {
      return (
        <div className="advanced">
          <div className="grad_year">
            <h3 class="advheader">Graduation Year:</h3>
            <select value={this.state.selectedYear} onChange={this.handleChangeYear} key="0" name="dropdownYear" id="0" className="select">
              {grad_years.map((year, i) =>                
                <option className="select" key={i} value={year}>{year}</option>
              )}
            </select>
          </div>
          <div className="major_adv">
            <h3 class="advheader">Major:</h3>
            <select value={this.state.selectedMajor} onChange={this.handleChangeMajor} key="1" name="dropdownMajor" id="1" className="select">
              {majors.map((major, i) =>
                <option key={i} value={major}>{major}</option>
              )}
            </select>
          </div>
        </div>
      )
    }
  }

  handleRadioName = (event) => {
    this.setState({
      type: "name",
    });
  }

  handleRadioOnlySkill = (event) => {
    this.setState({
      type: "skill",
    });
  }

  handleRadioCourse = (event) => {
    this.setState({
      type: "course",
    });
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  rednerRedirect = () => {
    if (this.state.redirect) {
      this.setState({
        redirect: false,
      })
      return (<Redirect to="/" />)
    }
  }

  render() {
    return (
      <div className="scout">
      {this.rednerRedirect()}
        <div className="navs">
          <TopNavBar/>
        </div>        
        <form onSubmit={this.handleSubmit} className="form"> 
        <h2>Scout</h2> 
        <FormGroup controlId="searchinput" bsSize="large">
          <FormControl
            className="FormInput ScoutForm"
            autoFocus
            type="text"
            placeholder="Enter a name, class, or skill"
            value={this.state.searchinput}
            onChange={this.handleChange}
          />
          </FormGroup>
          <p></p>
          <div className="type">
            <FormGroup>
              <h3>Type:</h3>
              <Radio name="radioGroup" onChange={this.handleRadioName} defaultChecked={true}>
                Name
              </Radio>
              <Radio name="radioGroup" onChange={this.handleRadioOnlySkill}>
                Skill
              </Radio>
              <Radio name="radioGroup" onChange={this.handleRadioCourse}>
                Course
              </Radio>
            </FormGroup>
          </div>

          <div className="advancedButton">
            <Route render={({ history}) => (
              <button
                id='advbutton'
                type='button'
                onClick={() => {

                  // Change button text
                  if (this.state.advText == "ADVANCED FILTERS") {
                    this.setState({
                      advText: "SIMPLE SEARCH",
                    })
                  } else {
                    this.setState({
                      advText: "ADVANCED FILTERS",
                    })
                  }

                  this.setState({
                    advanced: !this.state.advanced,
                  });
                }}
              >{this.state.advText}</button>
            )} />
          </div>
          <Button
              block
              bsSize="small"
              type="submit">
              SUBMIT        
          </Button>
          <p></p>
        </form>

        {this.renderAdvanced()}

        { this.renderResults() }
        {this.state.redirect && (
          <Redirect to={'/login'}/>   
        )}
      </div>
    );
  }
}

export default Scout;