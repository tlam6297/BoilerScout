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
      selectedMajor: "Computer Science",
      selectedYear: 2018,
      noResults: true,
      results: [],
      posts: [],
    };
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

    if (this.state.searchinput == '') {
      this.setState({
        results: [],
      })
      return;
    }
    
    const id = this.getLocalStorage("id");
    let token = this.getLocalStorage("token");

    // uncomment this line to test amn invalid token
    //token = "3ffadfadf"

    this.state.url = "http://localhost:8080/scout?" + "userId=" + id + "&token=" + token + "&type=" + this.state.type + "&query=" + this.state.searchinput

    if (this.state.advanced) {
      const oldURL = this.state.url;
      const newURL = oldURL + "&graduation=" + this.state.selectedYear + "&major=" + this.state.selectedMajor;
      this.setState({
        url: newURL,
      })
      //console.log(this.state)
    }
    
    // get request
    axios.get(this.state.url)
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
    return (
      <div className="results">
        <ul>
          <div className='li'>
            {this.state.results.map((result, index) =>
              <Link to={
                  `/profile?user_id=` + result.user_id + `&name=` + result.full_name + `&bio=` + result.bio + `&major=` + result.major + `&year=` + result.grad_year
                } className="link">
                <li key={index} className="listelem">
                  <div className='result entry'>
                    <div className="first entry">
                      {result.full_name}
                    </div>
                    <div className="major entry">
                      {result.major}
                    </div>
                    <div className="grad entry">
                      Grad Year: {result.grad_year}
                    </div>
                  </div>
                </li>
              </Link>
            )}
          </div>
        </ul>
      </div>
    )    
  }

  renderAdvanced = () => {
    const majors = [
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
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026,
      2027,
      2028,
      2029,
      2030,
    ];

    if (this.state.advanced) {
      return (
        <div className="advanced">
          <div className="grad_year">
            <h3>Graduation Year:</h3>
            <select value={this.state.selectedYear} onChange={this.handleChangeYear} name="dropdownYear" id="0" className="select">
              {grad_years.map((year, i) =>                
                <option className="select" value={year}>{year}</option>
              )}
            </select>
          </div>
          <div className="major">
            <h2>Major:</h2>
            <select value={this.state.selectedMajor} onChange={this.handleChangeMajor} name="dropdownMajor" id="1" className="select">
              {majors.map((major, i) =>
                <option value={major}>{major}</option>
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

  render() {
    return (
      <div className="scout">
        <div className="navs">
          <TopNavBar/>
        </div>        
        <form onSubmit={this.handleSubmit} className="form">  
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