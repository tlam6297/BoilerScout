import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import './EditProfile.css'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import axios from 'axios'
import UpdatePassword from './UpdatePassword';
class EditProfile extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeWhiteSkills = this.removeWhiteSkills.bind(this);
    this.removeWhiteCourses = this.removeWhiteCourses.bind(this);    
    this.handleChange = this.handleChange.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getID = this.getID.bind(this);

    this.state = {
      Bio: "",
      Courses: [],
      Email: "",
      Major: "",
      Name: "",
      Skills: [],
      user_id: "",
      edit_skills: false,
      edit_courses: false,
      edit_bio: false,
      edit_name: false,
      edit_grad: false,
      edit_major: false,
      allmajors: ["Accounting", "Acting", "Actuarial Science", "Aeronautical And Astronautical Engineering", "Aeronautical Engineering Technology", "Aerospace Financial Analysis", "African American Studies", "Agribusiness (Multiple Concentrations)", "Agricultural Communication", "Agricultural Economics (Multiple Concentrations)", "Agricultural Education", "Agricultural Engineering", "Agricultural Engineering", "Agricultural Systems Management", "Agronomy (Multiple Concentrations)", "Airline Management And Operations", "Airport Management And Operations", "American Studies", "Animal Sciences (Multiple Concentrations)", "Animation", "Anthropology", "Applied Exercise And Health (Pre)", "Applied Meteorology And Climatology", "Art History", "Asian Studies", "Athletic Training (Pre)", "Atmospheric Science/Meteorology", "Audio Engineering Technology", "Automation And Systems Integration Engineering Technology", "Aviation Management", "Biochemistry", "Biochemistry (Biology)", "Biochemistry (Chemistry)", "Biological Engineering - Multiple Concentrations", "Biological Engineering - Multiple Concentrations", "Biology", "Biomedical Engineering", "Brain And Behavioral Sciences", "Building Information Modeling", "Cell, Molecular, And Developmental Biology", "Chemical Engineering", "Chemistry", "Chemistry - American Chemical Society", "Chinese Studies", "Civil Engineering", "Classical Studies", "Communication, General (Pre)", "Comparative Literature", "Computer And Information Technology", "Computer Engineering", "Computer Science", "Construction Engineering", "Construction Management Technology", "Creative Writing", "Crop Science", "Cybersecurity", "Data Science", "Data Visualization", "Design And Construction Integration", "Developmental And Family Science", "Early Childhood Education And Exceptional Needs", "Ecology, Evolution, And Environmental Sciences", "Economics (School Of Management)", "Electrical Engineering", "Electrical Engineering Technology", "Elementary Education", "Engineering / Technology Teacher Education", "English", "Environmental And Ecological Engineering", "Environmental And Natural Resources Engineering", "Environmental And Natural Resources Engineering", "Environmental Geosciences", "Environmental Health Sciences", "Environmental Studies (Pre)", "Exploratory Studies", "Family And Consumer Sciences Education", "Farm Management", "Film And Theatre Production", "Film And Video Studies", "Finance", "Financial Counseling And Planning", "Fisheries And Aquatic Sciences", "Flight (Professional Flight Technology)", "Foods And Nutrition In Business", "Food Science", "Forestry", "French", "Game Development And Design", "General Education: Curriculum And Instruction (Non-Licensure)", "General Education: Educational Studies (Non-Licensure)", "Genetic Biology", "Geology And Geophysics", "German", "Global Studies", "Health And Disease", "Health Sciences - Preprofessional", "History", "Horticulture (Multiple Concentrations)", "Hospitality And Tourism Management", "Human Resource Development", "Human Services", "Industrial (Consumer Product) Design", "Industrial Engineering", "Industrial Engineering Technology", "Industrial Management", "Insect Biology", "Integrated Studio Arts", "Interdisciplinary Engineering Studies", "Interior (Space Planning) Design", "Italian Studies", "Japanese", "Jewish Studies", "Kinesiology", "Landscape Architecture (Pre)", "Law And Society", "Learning Sciences In Educational Studies (Non Licensure)", "Linguistics", "Management (General)", "Marketing", "Materials Engineering", "Mathematics", "Mathematics Education", "Mechanical Engineering", "Mechanical Engineering Technology", "Mechatronics Engineering Technology", "Medical Laboratory Sciences", "Microbiology", "Multidisciplinary Engineering", "Natural Resources And Environmental Science (Multiple Concentrations)", "Network Engineering Technology", "Neurobiology And Physiology", "Nuclear Engineering", "Nursing", "Nutrition, Fitness, And Health", "Nutrition And Dietetics", "Nutrition And Dietetics/Nutrition, Fitness And Health (Dual Major)", "Nutrition Science", "Occupational Health Science", "Organizational Leadership", "Pharmacy", "Philosophy", "Physics", "Planetary Sciences", "Plant Genetics, Breeding, And Biotechnology", "Plant Science", "Political Science", "Predentistry", "Prelaw", "Premedicine", "Preoccupational Therapy", "Prephysical Therapy", "Prephysician's Assistant", "Pre-Veterinary Medicine", "Professional Writing", "Psychological Sciences", "Public Health", "Purdue Polytechnic Institute Statewide Programs", "Radiological Health Sciences - Health Physics", "Radiological Health Sciences - Pre-Medical Physics", "Religious Studies", "Retail Management", "Robotics Engineering Technology", "Russian", "Sales And Marketing", "Science Education (Biology, Chemistry, Earth/Space, Physics)", "Selling And Sales Management", "Social Studies Education", "Sociology", "Soil And Water Sciences", "Sound For The Performing Arts", "Spanish", "Special Education: Elementary Education And Special Education - Mild Intervention", "Special Education: Mild And Intense Intervention P-12", "Special Education: Mild Intervention P-12", "Speech, Language, And Hearing Sciences", "Statistics - Applied Statistics", "Statistics With Mathematics Option", "Studio Arts And Technology", "Supply Chain Information And Analytics", "Supply Chain Management Technology", "Sustainable Biomaterials – Process And Product Design", "Sustainable Food And Farming Systems", "Systems Analysis And Design", "Theatre", "Theatre Design And Production", "Transdisciplinary Studies In Engineering Technology", "Transdisciplinary Studies In Technology", "Turf Management And Science", "Undecided Liberal Arts", "Undecided Within Engineering", "Unmanned Aerial Systems", "Ux Design", "Veterinary Technician Or Technologist", "Virtual Product Integration", "Visual Arts Design Education", "Visual Arts Education", "Visual Communications Design", "Visual Effects Compositing", "Web Programming And Design", "Wildlife", "Women’s, Gender And Sexuality Studies"],
    }
  }

  // Return user id if signed in, null if not
  signedIn = () => {
    return this.state.signedIn
  }

  // handle auth, set userid
  handleAuth = (user) => {
    localStorage.setItem('userid', user.uid)

    this.setState(
      { uid: user.uid }
    )

  }


  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  componentWillMount = () => {
    const user_id = this.getLocalStorage("id");
    const token = this.getLocalStorage("token");
    // const requested_id = this.state.user_id;

    const url = "http://localhost:8080/profile/get?id=" + user_id + "&token=" + token + "&query=" + user_id;

    axios.get(url)
      .then(res => {
        if (res.status == 200) {
          this.setState({
            ...res.data,
          });

        } else {
          alert("Invalid Token- Please login again");
          this.setState({
            redirect: true,
          })
        }
      });

  }

  removeWhiteSkills = (array) => {
    var i;

    for (i = 0; i < array.length; i++) {
      var curr = array[i];
      var nowhite = curr.replace(/\s/g, "");
      var temp = nowhite.toLowerCase();
      var firstchar = temp.charAt(0).toUpperCase();
      var final = firstchar + temp.slice(1);
      console.log(final);
      array[i] = final;
    }

    return array;
  }

  removeWhiteCourses = (array) => {
    var i;

    for (i = 0; i < array.length; i++) {
      var curr = array[i].toUpperCase();
      var nowhite = curr.replace(/\s/g, "");
      array[i] = nowhite;
    }

    return array;
  }

  handleSubmitPassword = (e) => {
    e.preventDefault();
    <Redirect to="/update-password" />
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: true })
    const _this = this;
    const id = _this.getLocalStorage("id");
    let token = _this.getLocalStorage("token");
    if (this.state.edit_courses && this.state.edit_skills) {
      var skillsarray = this.removeWhiteSkills(this.state.Skills.split(","));
      var coursesarray = this.removeWhiteCourses(this.state.Courses.split(","));
      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "bio": this.state.Bio,
        "courses": coursesarray,
        "skills": skillsarray,
        "fullName": this.state.Name,
        "grad_year": this.state.Graduation,
        "major": this.state.Major,
      });
      console.log(payload)
      fetch('http://localhost:8080/update-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked',
        },
        body: payload,
      })
        .then(function (response) {
          console.log(response.status == 200)
          if (response.status == 200) {
            document.getElementById("success").value = "Your profile was successfully updated!";
            response.json().then(json => {
            });
            alert("Profile successfully updated")
          } else {
            alert("Error in updating profile4");
          }
        })
    } else if (this.state.edit_courses && !this.state.edit_skills) {
      var coursesarray = this.removeWhiteCourses(this.state.Courses.split(","));
      var payload = JSON.stringify({       
        "userId": id,
        "token": token,
        "bio": this.state.Bio,
        "courses": coursesarray,
        "fullName": this.state.Name,
        "grad_year": this.state.Graduation,
        "major": this.state.Major,
      });
      console.log(payload)
      fetch('http://localhost:8080/update-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked',
        },
        body: payload,
      })
        .then(function (response) {
          if (response.status == 200) {
            document.getElementById("success").value = "Your profile was successfully updated!";
            response.json().then(json => {
              console.log(json);
            });
            alert("Profile successfully updated")
          } else {
            alert("Error in updating profile1");
          }
        })
    } else if (!this.state.edit_courses && this.state.edit_skills) {
      var skillsarray = this.removeWhiteSkills(this.state.Skills.split(","));
      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "bio": this.state.Bio,
        "skills": skillsarray,
        "fullName": this.state.Name,
        "grad_year": this.state.Graduation,
        "major": this.state.Major,
      });
      console.log(payload);
      fetch('http://localhost:8080/update-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked',
        },
        body: payload,
      })
        .then(function (response) {
          console.log(response.status == 200)
          if (response.status == 200) {
            document.getElementById("success").value = "Your profile was successfully updated!";
            response.json().then(json => {
              console.log(json);
            });
            alert("Profile successfully updated")
          } else {
            alert("Error in updating profile2");
          }
        })
    } else {
      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "bio": this.state.Bio,
        "fullName": this.state.Name,
        "grad_year": this.state.Graduation,
        "major": this.state.Major,
      });
      console.log(payload)
      fetch('http://localhost:8080/update-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked',
        },
        body: payload,
      })
        .then(function (response) {
          console.log(response)
          if (response.status == 200) {
            document.getElementById("success").value = "Your profile was successfully updated!";
            response.json().then(json => {
            });
            alert("Profile successfully updated")
          } else {
            alert("Error in updating profile3");
          }
        })
    }
    this.setState({
      edit_courses: false,
      edit_skills: false,
      edit_bio: false,
      edit_name: false,
      edit_grad: false,
      edit_major: false,
    });
  }


  handleChange = (event) => {

    this.setState({
      [event.target.id]: event.target.value
    });

    console.log(event.target.id)
    if (event.target.className == "FormInput courses form-control") {
      this.setState({
        edit_courses: true
      });
    } else if (event.target.className == "FormInput skills form-control") {
      this.setState({
        edit_skills: true
      });
    } else if (event.target.className == "Bio") {
      this.setState({
        edit_bio: true
      });
    } else if (event.target.className == "FormInput name form-control") {
      this.setState({
        edit_name: true
      });
    } else if (event.target.className == "FormInput graduation") {
      this.setState({
        edit_grad: true
      });
    } else if (event.target.className == "FormInput major") {
      this.setState({
        edit_major: true
      });

    }

    document.getElementById("success").textContent = "";
  }
  getAccessToken = () => {
    // The type of token might be JSON
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('No Token Found');
    }
    return token;
  }

  getID = () => {
    // The type of token might be JSON
    const id = localStorage.getItem("id");
    if (!id) {
      throw new Error('No ID Found');
    }
    return id;
  }
  componentDidUpdate = () => {
  }
  // handle unauth, remove userid
  handleUnauth = () => {
    localStorage.removeItem('uid')
  }

  render() {
    return (
      <div className="EditProfile">
        <div className="Container">
          <h4 id="greeting">Hello, {this.state.Name}</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="editForm">
              <h2 id="editHeader">Edit Profile</h2>
              <FormGroup controlId="Name" bsSize="large">
                <ControlLabel className="edit">Name:</ControlLabel>
                <br />
                <FormControl
                  className="FormInput name"
                  id="Name"
                  autoFocus
                  type="text"
                  value={this.state.Name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="Graduation" bsSize="large">
                <ControlLabel className="edit">Graduation Year:</ControlLabel>
                <br />
                <select
                  className="FormInput graduation"
                  id="Graduation"
                  value={this.state.Graduation}
                  onChange={this.handleChange}>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </FormGroup>
              <FormGroup controlId="Major" bsSize="large">
                <ControlLabel className="edit">Major:</ControlLabel>
                <br />
                <select
                  className="FormInput major"
                  id="Major"
                  value={this.state.Major}
                  onChange={this.handleChange}>
                  {this.state.allmajors.map((result, index) =>
                    <option value={result}>{result}</option>
                  )}
                </select>
              </FormGroup>
              <ControlLabel className="edit">Bio:</ControlLabel>
              <br/>
              <textarea
                wrap="soft"
                id="Bio"
                value={this.state.Bio}
                className="Bio"
                placeholder="Tell Boilers about yourself"
                contenteditable="true"
                onChange={this.handleChange}
                >
              </textarea>            
              <FormGroup controlId="Courses" bsSize="large">
                <ControlLabel className="edit">Courses:</ControlLabel>
                <br />
                <FormControl
                  className="FormInput courses"
                  autoFocus
                  type="text"
                  placeholder="Enter courses with a comma between each"
                  value={this.state.Courses}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="Skills" bsSize="large">
                <ControlLabel className="edit">Skills:</ControlLabel>
                <br />
                <FormControl
                  className="FormInput skills"
                  autoFocus
                  type="text"
                  placeholder="Enter skills with a comma between each"
                  value={this.state.Skills}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                bsSize="small"
                className="submitbutton"
                type="submit">
                SUBMIT
          </Button>
              <div id="success">

              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditProfile;

