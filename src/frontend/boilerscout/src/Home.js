import React from 'react';

const Home = () => {

    return (
        <div className="Home">
            <header className="Header">
             <div className="SignUpButton">
                <button href="#" > 
                SIGN UP
                </button>
             </div>
             <div className="LoginButton">
                <button href="#">
                LOGIN
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