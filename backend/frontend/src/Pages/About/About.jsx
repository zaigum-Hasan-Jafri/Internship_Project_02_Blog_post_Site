import React from 'react'
import './About.css'
const About = () => {
    
    return (
        <div className='about' id='About' >
            <div id="animated-section" className='about-me-container'>
                <img src='/images/profile.png' alt="Profile" className='profile-image' />
                <h1 className='heading'>Hello, I'm Zaigum!</h1>
                <p className='description f-josefin'>I'm a full-stack developer with a passion for building web applications using the MERN stack. In my free time, I enjoy exploring new technologies and working on personal projects.</p>
            </div>
            <div className="about-container">
                <div className="lac f-josefin">Portfolio link:</div>
                <div className="rac"><a href='https:zaigum-portfolio.netlify.app' target={'_blank'} className='link'>Portfolio Live Link</a></div>
            </div>
        </div>
    )
}

export default About
