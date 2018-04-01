import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import NavBar from './TopNavBar.js'
import './Community.css'

class Forum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forum: "Class Help",
            forum_id: "",
            listOfThreads: [],
        }
    }

    componentDidMount = () => {
        const user_id = localStorage.getItem("id");
        const token = localStorage.getItem("token"); 

        this.state.url = "http://localhost:8080/forums"
    
        // get request
        axios.get(this.state.url)
        .then(res => {
          // console.log(res.data.query);
          if (res.data.status == "OK") {
            this.setState({
              // set listOfThreads to result
            });        
          } else {
            alert("Invalid Token- Please login again");
            this.setState({
              redirect: true,
            })
          }      
        });
    }

renderPosts = () => {
    return (
      <div className="results">
        <ul>
          <div className='li'>
            Put list of threads here
          </div>
        </ul>
      </div>
    )    
  }
    render() {
        return (
        <div className="Forum">
            <div className="NavBar">
                <NavBar/>
                </div>
                <div class="grid-container">
                    <h2> {this.state.forum} </h2>
                </div>
            </div>
    );
  }
}

export default Forum;