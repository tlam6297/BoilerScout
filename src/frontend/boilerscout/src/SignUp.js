import React, { Component } from 'react'
import { BrowserRouter as Route, Router, Link, Redirect } from 'react-router-dom'
import { Button, FormGroup, FormControl, Feedback, ControlLabel, HelpBlock } from "react-bootstrap";
import './SignUp.css'
import Logo from './Logo'
import POSTRequest from './POSTRequest'
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateRepeatPassword = this.validateRepeatPassword.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateGraduation = this.validateGraduation.bind(this);
    this.validateMajor = this.validateMajor.bind(this);

    this.state = {
      email: "",
      password: "",
      repeatpassword: "",
      changed: false,
      fullname: "",
      Major: " ",
      Graduation: "-1",
      redirect: false,
      allmajors: [" ", "Accounting", "Acting", "Actuarial Science", "Aeronautical And Astronautical Engineering", "Aeronautical Engineering Technology", "Aerospace Financial Analysis", "African American Studies", "Agribusiness (Multiple Concentrations)", "Agricultural Communication", "Agricultural Economics (Multiple Concentrations)", "Agricultural Education", "Agricultural Engineering", "Agricultural Engineering", "Agricultural Systems Management", "Agronomy (Multiple Concentrations)", "Airline Management And Operations", "Airport Management And Operations", "American Studies", "Animal Sciences (Multiple Concentrations)", "Animation", "Anthropology", "Applied Exercise And Health (Pre)", "Applied Meteorology And Climatology", "Art History", "Asian Studies", "Athletic Training (Pre)", "Atmospheric Science/Meteorology", "Audio Engineering Technology", "Automation And Systems Integration Engineering Technology", "Aviation Management", "Biochemistry", "Biochemistry (Biology)", "Biochemistry (Chemistry)", "Biological Engineering - Multiple Concentrations", "Biological Engineering - Multiple Concentrations", "Biology", "Biomedical Engineering", "Brain And Behavioral Sciences", "Building Information Modeling", "Cell, Molecular, And Developmental Biology", "Chemical Engineering", "Chemistry", "Chemistry - American Chemical Society", "Chinese Studies", "Civil Engineering", "Classical Studies", "Communication, General (Pre)", "Comparative Literature", "Computer And Information Technology", "Computer Engineering", "Computer Science", "Construction Engineering", "Construction Management Technology", "Creative Writing", "Crop Science", "Cybersecurity", "Data Science", "Data Visualization", "Design And Construction Integration", "Developmental And Family Science", "Early Childhood Education And Exceptional Needs", "Ecology, Evolution, And Environmental Sciences", "Economics (School Of Management)", "Electrical Engineering", "Electrical Engineering Technology", "Elementary Education", "Engineering / Technology Teacher Education", "English", "Environmental And Ecological Engineering", "Environmental And Natural Resources Engineering", "Environmental And Natural Resources Engineering", "Environmental Geosciences", "Environmental Health Sciences", "Environmental Studies (Pre)", "Exploratory Studies", "Family And Consumer Sciences Education", "Farm Management", "Film And Theatre Production", "Film And Video Studies", "Finance", "Financial Counseling And Planning", "Fisheries And Aquatic Sciences", "Flight (Professional Flight Technology)", "Foods And Nutrition In Business", "Food Science", "Forestry", "French", "Game Development And Design", "General Education: Curriculum And Instruction (Non-Licensure)", "General Education: Educational Studies (Non-Licensure)", "Genetic Biology", "Geology And Geophysics", "German", "Global Studies", "Health And Disease", "Health Sciences - Preprofessional", "History", "Horticulture (Multiple Concentrations)", "Hospitality And Tourism Management", "Human Resource Development", "Human Services", "Industrial (Consumer Product) Design", "Industrial Engineering", "Industrial Engineering Technology", "Industrial Management", "Insect Biology", "Integrated Studio Arts", "Interdisciplinary Engineering Studies", "Interior (Space Planning) Design", "Italian Studies", "Japanese", "Jewish Studies", "Kinesiology", "Landscape Architecture (Pre)", "Law And Society", "Learning Sciences In Educational Studies (Non Licensure)", "Linguistics", "Management (General)", "Marketing", "Materials Engineering", "Mathematics", "Mathematics Education", "Mechanical Engineering", "Mechanical Engineering Technology", "Mechatronics Engineering Technology", "Medical Laboratory Sciences", "Microbiology", "Multidisciplinary Engineering", "Natural Resources And Environmental Science (Multiple Concentrations)", "Network Engineering Technology", "Neurobiology And Physiology", "Nuclear Engineering", "Nursing", "Nutrition, Fitness, And Health", "Nutrition And Dietetics", "Nutrition And Dietetics/Nutrition, Fitness And Health (Dual Major)", "Nutrition Science", "Occupational Health Science", "Organizational Leadership", "Pharmacy", "Philosophy", "Physics", "Planetary Sciences", "Plant Genetics, Breeding, And Biotechnology", "Plant Science", "Political Science", "Predentistry", "Prelaw", "Premedicine", "Preoccupational Therapy", "Prephysical Therapy", "Prephysician's Assistant", "Pre-Veterinary Medicine", "Professional Writing", "Psychological Sciences", "Public Health", "Purdue Polytechnic Institute Statewide Programs", "Radiological Health Sciences - Health Physics", "Radiological Health Sciences - Pre-Medical Physics", "Religious Studies", "Retail Management", "Robotics Engineering Technology", "Russian", "Sales And Marketing", "Science Education (Biology, Chemistry, Earth/Space, Physics)", "Selling And Sales Management", "Social Studies Education", "Sociology", "Soil And Water Sciences", "Sound For The Performing Arts", "Spanish", "Special Education: Elementary Education And Special Education", "Special Education: Mild And Intense Intervention P-12", "Special Education: Mild Intervention P-12", "Speech, Language, And Hearing Sciences", "Statistics - Applied Statistics", "Statistics With Mathematics Option", "Studio Arts And Technology", "Supply Chain Information And Analytics", "Supply Chain Management Technology", "Sustainable Biomaterials – Process And Product Design", "Sustainable Food And Farming Systems", "Systems Analysis And Design", "Theatre", "Theatre Design And Production", "Transdisciplinary Studies In Engineering Technology", "Transdisciplinary Studies In Technology", "Turf Management And Science", "Undecided Liberal Arts", "Undecided Within Engineering", "Unmanned Aerial Systems", "Ux Design", "Veterinary Technician Or Technologist", "Virtual Product Integration", "Visual Arts Design Education", "Visual Arts Education", "Visual Communications Design", "Visual Effects Compositing", "Web Programming And Design", "Wildlife", "Women’s, Gender And Sexuality Studies"],
    };
  }

  validateForm = () => {
    if (this.state.Graduation == "-1" || this.state.Major == "-1") {
      return false;
    }
      const email = this.state.email.toLowerCase();
      const regex = /^\S+@purdue.edu$/;
      const validEmail = regex.test(email);
      
      const password = this.state.password;
      const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
      const validPassword = passwordregex.test(password);
  
      const repeatpass = this.state.repeatpassword;
      const repeatPassword = (password == repeatpass);
      return (validEmail && validPassword && repeatPassword);
  }

  handleChange = (event) => {
    let mytarget = event.target.id;
    this.setState({
      [event.target.id]: event.target.value,
      changed: true,
    }, (event) => {
      switch (mytarget) {
        case 'email':
          this.validateEmail();
          break;
        case 'password':
          this.validatePassword();
          break;
        case 'repeatpassword':
          this.validateRepeatPassword();
          break;
        case 'fullname':
          this.validateName();
          break;
        case 'Graduation':
          this.validateGraduation();
          break;
        case 'Major':
          this.validateMajor();
          break;
        default:
          break;
      }
    });

  }


  handleSubmit = (event) => {
      event.preventDefault();
      this.validateName();
      this.validateGraduation();
      this.validateMajor();
      this.validateEmail();
      this.validatePassword();
      this.validateRepeatPassword();
      if (this.validateForm()) {
      const _this = this;
      const email = this.state.email;

      const g = this.state.Graduation;
      const year = parseInt(g);

      const payload = JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
        "fullName": this.state.fullname,
        "major": this.state.Major,
        "grad_year": year,
      });

      console.log(payload);

      fetch('http://localhost:8080/sign-up', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked',
        },
        body: payload
      }).then(function (response) {
        if (response.ok) {
          const email2 = email;
          const _this_ = _this;

          // user created
          // now send confimation FOR NEW INTIIAL USER

          const payload = JSON.stringify({
            'email': email2,
          });


          fetch('http://localhost:8080/send/verification', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'transfer-encoding': 'chunked',
            },
            body: payload,
          })
            .then(function (response) {
              if (response.ok) {
                console.log("Sent verification successfully");
              } else {
                console.log("error sending email verification")
              }
            })
          _this.setState({ redirect: true })
        } else {
          alert("Error: You are already a member!");
          console.log(response);
        }
      })
    }
  }

  validateEmail = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);
    if (validEmail) {
      document.getElementById("email").setCustomValidity("");
    } else {
      document.getElementById("email").setCustomValidity("Please enter a Purdue email.");
    }
  }

  validatePassword = () => {
    const password = this.state.password;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    let passtemperror = ["Password "];
    let passerror;
    const validPassword = passwordregex.test(password);

    if (!validPassword) {
      const passonedigit = /^(?=.*[0-9])/;
      const passoneuppercase = /^(?=.*[A-Z])/;
      const passonespecialchar = /^(?=.*[$@$!%*?&])/;
      const passlengtheight = /^.{8,12}$/;
      let i = 1;
      if (!passonedigit.test(password)) {
        passtemperror[i] = "must have one digit"
        i++;
      }

      if (!passoneuppercase.test(password)) {
        if (i != 1) {
          passtemperror[i] = ", one uppercase character"
        } else {
          passtemperror[i] = "must have one uppercase character"
        }
        i++;
      }

      if (!passonespecialchar.test(password)) {
        if (i != 1) {
          passtemperror[i] = ", one special ($@$!%*?&) character. "
        } else {
          passtemperror[i] = "must have one special ($@$!%*?&) character. "
        }
        i++;
      }

      if (!passlengtheight.test(password)) {
        if (i != 1) {
          passtemperror[i] = "Password length must be between 8 and 12 characters"
        } else {
          passtemperror[i] = "length must be between 8 and 12 characters"
        }
        i++;
      }

      passtemperror[i] = ".";


      passerror = passtemperror.join("");
      document.getElementById("password").setCustomValidity(passerror);

    } else {
      document.getElementById("password").setCustomValidity("");
    }

  }

  validateRepeatPassword = () => {
    const password = this.state.password;
    const repeatpass = this.state.repeatpassword;
    const repeatPassword = (password == repeatpass);
    if (this.state.repeatpassword == "") {
      document.getElementById("repeatpassword").setCustomValidity("Please enter your password again.");
      return;
    }
    if (!repeatPassword) {
      document.getElementById("repeatpassword").setCustomValidity("Passwords don't match.");
    } else {
      document.getElementById("repeatpassword").setCustomValidity("");
    }

  }

  validateGraduation = () => {
    
    if (this.state.Graduation == "-1") {
      document.getElementById("Graduation").setCustomValidity("Please select your graduation year.");
    } else {
      document.getElementById("Graduation").setCustomValidity("");
    }
  }

  validateMajor = () => {
    if (this.state.Major == " ") {      
      document.getElementById("Major").setCustomValidity("Please select your major.");
    } else {
      document.getElementById("Major").setCustomValidity("");
    }
  }

  validateName = () => {
    if (this.state.fullname == "" || this.state.fullname.length == 0 || this.state.fullname.indexOf(' ') < 0) {
      document.getElementById("fullname").setCustomValidity("Please enter your name.");
    } else {
      document.getElementById("fullname").setCustomValidity("");
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="SignUp">
          <Logo />
          <form novalidate onSubmit={this.handleSubmit}>
            <div className="Form grid-container-signup">
              <FormGroup className="form-item" controlId="fullname" bsSize="large">
                <ControlLabel>Full Name:</ControlLabel>
                <br />
                <FormControl
                  className="FormInput"
                  autoFocus
                  type="text"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="form-item" controlId="Graduation" bsSize="large">
                <ControlLabel>Graduation Year:</ControlLabel>
                <br />
                <select
                  className="FormInput graduation"
                  id="Graduation"
                  value={this.state.Graduation}
                  onChange={this.handleChange}>
                  <option value="-1"></option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </FormGroup>
              <FormGroup className="form-item" controlId="Major" bsSize="large">
                <ControlLabel>Major:</ControlLabel>
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
              <FormGroup className="form-item" controlId="email" bsSize="large">
                <ControlLabel>Email:</ControlLabel>
                <br />
                <FormControl
                  className="FormInput"
                  autoFocus
                  id="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="form-item" controlId="password" bsSize="large">
                <ControlLabel>Password:</ControlLabel>
                <br />
                <FormControl
                  className="FormInput Password"
                  autoFocus
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="form-item" controlId="repeatpassword" bsSize="large">
                <ControlLabel>Repeat Password:</ControlLabel>
                <br />
                <FormControl
                  className="FormInput repeatPassword"
                  autoFocus
                  type="password"
                  value={this.state.repeatpassword}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <Button
              block
              className="submitbutton"
              bsSize="small"
              type="submit">
              SUBMIT
          </Button>
          </form>
          <Link to="/login">Already a member?</Link>
          <p></p>
          <Link to="/resend-confirmation">Resend Confirmation?</Link>
          {this.state.redirect && (
            <Redirect to={'/confirmation-resent'} />
          )}
        </div>
      </div>
    )
  }
}

export default SignUp;