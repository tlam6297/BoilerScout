import React, {Component} from 'react'
import { BrowserRouter as Route, Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './SignUp.css'
import Logo from './Logo'
import POSTRequest from './POSTRequest'

class SignUp extends Component {
  constructor (props) {
      super(props);
      this.majorDropdown = this.majorDropdown.bind(this);

    this.state = {
      email: "",
      password: "",
      repeatpassword: "",
      fullname: "",
      Major: "",
      Graduation: "",
      redirect: false,
      allmajors: ["Accounting","Acting","Actuarial Science","Aeronautical And Astronautical Engineering","Aeronautical Engineering Technology","Aerospace Financial Analysis","African American Studies","Agribusiness (Multiple Concentrations)","Agricultural Communication","Agricultural Economics (Multiple Concentrations)","Agricultural Education","Agricultural Engineering","Agricultural Engineering","Agricultural Systems Management","Agronomy (Multiple Concentrations)","Airline Management And Operations","Airport Management And Operations","American Studies","Animal Sciences (Multiple Concentrations)","Animation","Anthropology","Applied Exercise And Health (Pre)","Applied Meteorology And Climatology","Art History","Asian Studies","Athletic Training (Pre)","Atmospheric Science/Meteorology","Audio Engineering Technology","Automation And Systems Integration Engineering Technology","Aviation Management","Biochemistry","Biochemistry (Biology)","Biochemistry (Chemistry)","Biological Engineering - Multiple Concentrations","Biological Engineering - Multiple Concentrations","Biology","Biomedical Engineering","Brain And Behavioral Sciences","Building Information Modeling","Cell, Molecular, And Developmental Biology","Chemical Engineering","Chemistry","Chemistry - American Chemical Society","Chinese Studies","Civil Engineering","Classical Studies","Communication, General (Pre)","Comparative Literature","Computer And Information Technology","Computer Engineering","Computer Science","Construction Engineering","Construction Management Technology","Creative Writing","Crop Science","Cybersecurity","Data Science","Data Visualization","Design And Construction Integration","Developmental And Family Science","Early Childhood Education And Exceptional Needs","Ecology, Evolution, And Environmental Sciences","Economics (School Of Management)","Electrical Engineering","Electrical Engineering Technology","Elementary Education","Engineering / Technology Teacher Education","English","Environmental And Ecological Engineering","Environmental And Natural Resources Engineering","Environmental And Natural Resources Engineering","Environmental Geosciences","Environmental Health Sciences","Environmental Studies (Pre)","Exploratory Studies","Family And Consumer Sciences Education","Farm Management","Film And Theatre Production","Film And Video Studies","Finance","Financial Counseling And Planning","Fisheries And Aquatic Sciences","Flight (Professional Flight Technology)","Foods And Nutrition In Business","Food Science","Forestry","French","Game Development And Design","General Education: Curriculum And Instruction (Non-Licensure)","General Education: Educational Studies (Non-Licensure)","Genetic Biology","Geology And Geophysics","German","Global Studies","Health And Disease","Health Sciences - Preprofessional","History","Horticulture (Multiple Concentrations)","Hospitality And Tourism Management","Human Resource Development","Human Services","Industrial (Consumer Product) Design","Industrial Engineering","Industrial Engineering Technology","Industrial Management","Insect Biology","Integrated Studio Arts","Interdisciplinary Engineering Studies","Interior (Space Planning) Design","Italian Studies","Japanese","Jewish Studies","Kinesiology","Landscape Architecture (Pre)","Law And Society","Learning Sciences In Educational Studies (Non Licensure)","Linguistics","Management (General)","Marketing","Materials Engineering","Mathematics","Mathematics Education","Mechanical Engineering","Mechanical Engineering Technology","Mechatronics Engineering Technology","Medical Laboratory Sciences","Microbiology","Multidisciplinary Engineering","Natural Resources And Environmental Science (Multiple Concentrations)","Network Engineering Technology","Neurobiology And Physiology","Nuclear Engineering","Nursing","Nutrition, Fitness, And Health","Nutrition And Dietetics","Nutrition And Dietetics/Nutrition, Fitness And Health (Dual Major)","Nutrition Science","Occupational Health Science","Organizational Leadership","Pharmacy","Philosophy","Physics","Planetary Sciences","Plant Genetics, Breeding, And Biotechnology","Plant Science","Political Science","Predentistry","Prelaw","Premedicine","Preoccupational Therapy","Prephysical Therapy","Prephysician's Assistant","Pre-Veterinary Medicine","Professional Writing","Psychological Sciences","Public Health","Purdue Polytechnic Institute Statewide Programs","Radiological Health Sciences - Health Physics","Radiological Health Sciences - Pre-Medical Physics","Religious Studies","Retail Management","Robotics Engineering Technology","Russian","Sales And Marketing","Science Education (Biology, Chemistry, Earth/Space, Physics)","Selling And Sales Management","Social Studies Education","Sociology","Soil And Water Sciences","Sound For The Performing Arts","Spanish","Special Education: Elementary Education And Special Education","Special Education: Mild And Intense Intervention P-12","Special Education: Mild Intervention P-12","Speech, Language, And Hearing Sciences","Statistics - Applied Statistics","Statistics With Mathematics Option","Studio Arts And Technology","Supply Chain Information And Analytics","Supply Chain Management Technology","Sustainable Biomaterials – Process And Product Design","Sustainable Food And Farming Systems","Systems Analysis And Design","Theatre","Theatre Design And Production","Transdisciplinary Studies In Engineering Technology","Transdisciplinary Studies In Technology","Turf Management And Science","Undecided Liberal Arts","Undecided Within Engineering","Unmanned Aerial Systems","Ux Design","Veterinary Technician Or Technologist","Virtual Product Integration","Visual Arts Design Education","Visual Arts Education","Visual Communications Design","Visual Effects Compositing","Web Programming And Design","Wildlife","Women’s, Gender And Sexuality Studies"],  
    };
  }

  validateForm = () => {
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

  majorDropdown = () => {
    var majors = [
      "Accounting","Acting","Actuarial Science","Aeronautical And Astronautical Engineering","Aeronautical Engineering Technology","Aerospace Financial Analysis","African American Studies","Agribusiness (Multiple Concentrations)","Agricultural Communication","Agricultural Economics (Multiple Concentrations)","Agricultural Education","Agricultural Engineering","Agricultural Engineering","Agricultural Systems Management","Agronomy (Multiple Concentrations)","Airline Management And Operations","Airport Management And Operations","American Studies","Animal Sciences (Multiple Concentrations)","Animation","Anthropology","Applied Exercise And Health (Pre)","Applied Meteorology And Climatology","Art History","Asian Studies","Athletic Training (Pre)","Atmospheric Science/Meteorology","Audio Engineering Technology","Automation And Systems Integration Engineering Technology","Aviation Management","Biochemistry","Biochemistry (Biology)","Biochemistry (Chemistry)","Biological Engineering - Multiple Concentrations","Biological Engineering - Multiple Concentrations","Biology","Biomedical Engineering","Brain And Behavioral Sciences","Building Information Modeling","Cell, Molecular, And Developmental Biology","Chemical Engineering","Chemistry","Chemistry - American Chemical Society","Chinese Studies","Civil Engineering","Classical Studies","Communication, General (Pre)","Comparative Literature","Computer And Information Technology","Computer Engineering","Computer Science","Construction Engineering","Construction Management Technology","Creative Writing","Crop Science","Cybersecurity","Data Science","Data Visualization","Design And Construction Integration","Developmental And Family Science","Early Childhood Education And Exceptional Needs","Ecology, Evolution, And Environmental Sciences","Economics (School Of Management)","Electrical Engineering","Electrical Engineering Technology","Elementary Education","Engineering / Technology Teacher Education","English","Environmental And Ecological Engineering","Environmental And Natural Resources Engineering","Environmental And Natural Resources Engineering","Environmental Geosciences","Environmental Health Sciences","Environmental Studies (Pre)","Exploratory Studies","Family And Consumer Sciences Education","Farm Management","Film And Theatre Production","Film And Video Studies","Finance","Financial Counseling And Planning","Fisheries And Aquatic Sciences","Flight (Professional Flight Technology)","Foods And Nutrition In Business","Food Science","Forestry","French","Game Development And Design","General Education: Curriculum And Instruction (Non-Licensure)","General Education: Educational Studies (Non-Licensure)","Genetic Biology","Geology And Geophysics","German","Global Studies","Health And Disease","Health Sciences - Preprofessional","History","Horticulture (Multiple Concentrations)","Hospitality And Tourism Management","Human Resource Development","Human Services","Industrial (Consumer Product) Design","Industrial Engineering","Industrial Engineering Technology","Industrial Management","Insect Biology","Integrated Studio Arts","Interdisciplinary Engineering Studies","Interior (Space Planning) Design","Italian Studies","Japanese","Jewish Studies","Kinesiology","Landscape Architecture (Pre)","Law And Society","Learning Sciences In Educational Studies (Non Licensure)","Linguistics","Management (General)","Marketing","Materials Engineering","Mathematics","Mathematics Education","Mechanical Engineering","Mechanical Engineering Technology","Mechatronics Engineering Technology","Medical Laboratory Sciences","Microbiology","Multidisciplinary Engineering","Natural Resources And Environmental Science (Multiple Concentrations)","Network Engineering Technology","Neurobiology And Physiology","Nuclear Engineering","Nursing","Nutrition, Fitness, And Health","Nutrition And Dietetics","Nutrition And Dietetics/Nutrition, Fitness And Health (Dual Major)","Nutrition Science","Occupational Health Science","Organizational Leadership","Pharmacy","Philosophy","Physics","Planetary Sciences","Plant Genetics, Breeding, And Biotechnology","Plant Science","Political Science","Predentistry","Prelaw","Premedicine","Preoccupational Therapy","Prephysical Therapy","Prephysician's Assistant","Pre-Veterinary Medicine","Professional Writing","Psychological Sciences","Public Health","Purdue Polytechnic Institute Statewide Programs","Radiological Health Sciences - Health Physics","Radiological Health Sciences - Pre-Medical Physics","Religious Studies","Retail Management","Robotics Engineering Technology","Russian","Sales And Marketing","Science Education (Biology, Chemistry, Earth/Space, Physics)","Selling And Sales Management","Social Studies Education","Sociology","Soil And Water Sciences","Sound For The Performing Arts","Spanish","Special Education: Elementary Education And Special Education - Mild Intervention","Special Education: Mild And Intense Intervention P-12","Special Education: Mild Intervention P-12","Speech, Language, And Hearing Sciences","Statistics - Applied Statistics","Statistics With Mathematics Option","Studio Arts And Technology","Supply Chain Information And Analytics","Supply Chain Management Technology","Sustainable Biomaterials – Process And Product Design","Sustainable Food And Farming Systems","Systems Analysis And Design","Theatre","Theatre Design And Production","Transdisciplinary Studies In Engineering Technology","Transdisciplinary Studies In Technology","Turf Management And Science","Undecided Liberal Arts","Undecided Within Engineering","Unmanned Aerial Systems","Ux Design","Veterinary Technician Or Technologist","Virtual Product Integration","Visual Arts Design Education","Visual Arts Education","Visual Communications Design","Visual Effects Compositing","Web Programming And Design","Wildlife","Women’s, Gender And Sexuality Studies"
    ]
   
    var dropdown = document.getElementById("Major");
    for (var i = 0; i < majors.length; i++) {
      var curr = majors[i];
      var el = document.createElement("option");
      el.textContent = curr;
      el.value = curr;
      //dropdown.appendChild(el);
      console.log("uh oh");
      console.log(dropdown);
      console.log("uh oh");
    }
   
   }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });

    console.log(this.state);
  }

  handleSubmit = (event) => {
      event.preventDefault();
      const _this = this;
      const email = this.state.email;

      const g = this.state.grad;
      const year = parseInt(g);

      const payload = JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
        "fullName": this.state.fullname,
        "major": this.state.major,
        "grad_year": year,
      });

      fetch('http://localhost:8080/sign-up', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked',
        },
        body: payload
      }).then(function(response) {
        if (response.ok) {
          const email2 = email;
          const _this_ = _this;

          // user created
          // now send confimation FOR NEW INTIIAL USER

          const payload = JSON.stringify ({
            'email': email2,
          });

          /////////

          
          fetch('http://localhost:8080/send/verification', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'transfer-encoding': 'chunked',
            },
            body: payload,
          })
          .then(function(response) {
            if (response.ok) {
              console.log("Sent verification successfully");
            } else {
              console.log("error sending email verification")
            }      
          })


          // ///////////////////
      
          // const post = new POSTRequest(payload, 'http://localhost:8080/send/verification');
          // post.send();

          _this.setState({ redirect: true })
        } else {
          alert("Error: User Name already Exists!");
          console.log(response);
        }
      })
  }

  render () {
    return (
      <div className="wrapper">
      <div className="SignUp">
      <Logo/>
        <form onSubmit={this.handleSubmit}>
          <div className="Form">
          <FormGroup controlId="fullname" bsSize="large">
              <ControlLabel>Full Name:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="text"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="grad" bsSize="large">
            <ControlLabel>Graduation Year:</ControlLabel>
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
            <FormGroup controlId="grad" bsSize="large">
            <ControlLabel>Major:</ControlLabel>
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
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password:</ControlLabel>
                <FormControl
                  className="FormInput Password"
                  autoFocus
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId="repeatpassword" bsSize="large">
              <ControlLabel>Repeat Password:</ControlLabel>
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
            bsSize="small"
            disabled={!this.validateForm()}
            type="submit">
            SUBMIT        
          </Button>
        </form>
        <Link to="/login">Already a member?</Link>
        <p></p>
        <Link to="/resend-confirmation">Resend Confirmation?</Link>
        {this.state.redirect && (
          <Redirect to={'/profile-created'}/>   
        )}
        </div>
      </div>
    )
  }
}

export default SignUp;