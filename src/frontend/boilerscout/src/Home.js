import React from 'react';
import { Component } from 'react';
import './Home.css'
const Home = () =>  {
    
    function handleClick(e) {
            e.preventDefault();
            console.log("WOW");
    }
    
    return (
        <div className="Home">
             <div className="SignUpButton">
                <button href="#" onClick={handleClick} > 
                SIGN UP
                </button>
             </div>
             <div href="#" className="LoginButton">
                <button onClick={handleClick}>
                LOGIN
                </button>
             </div>
        </div>
    );
}

export default Home;