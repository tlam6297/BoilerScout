import React from 'react';

const Home = () => {

    return (
        <div className="Home">
            <header className="Header">
             <div className="SignUpButton">
             <button class="button medium-btn" href="#" > 
              Sign Up
             </button>
             </div>
             <div className="LoginButton">
             <button class="button medium-btn" href="#">
             Login
             </button>
             </div>
             <div className="ForgotPLink">
             <a href="#" >
                Forgot Password? 
             </a>
             </div>
            </header>
        </div>
    )

}

export default Home;