import React from 'react'
import NavBar from './Navbar'
import { Nav } from 'react-bootstrap'
import about from '../Images/about_img.jpg'

const About = () => {

  const lineStyle = {
    width: '50%',       // Adjust the width as needed, e.g., '50%', '200px', etc.
    color: 'blue',      // Adjust the color as needed, e.g., 'red', '#00FF00', etc.
    backgroundColor: 'blue', // Set background color to match the line color
    height: '2px',      // Set the height of the line
    border: 'none',     // Remove default border
    margin: '10px 0',   // Add some spacing above and below the line
  };
  return (
    <div className="learn-class-container">
    <NavBar />
    <div className="learn-class">
      <div className="learn-image">
        <img src={about} alt="hello" />
      </div>
      <div className="learn-container">
       <h1>About Us</h1>
        <br />
        <p>
        Welcome to Vitalize Mind! We are a passionate team dedicated to provide an environment or platform which can help you to fight against your mental health issues. After naalyzing someone's state of mind we can provide them something which will relax them . Our journey began when we found out that there are a lot of people suffering from  mentalhealth issues unknowingly. They can't talk to anyone , can't consult either. That thing led them finally to fdo something harmful to themselves. Thank you for choosing Vitalize Mind as your mental health partner. 
        Explore our website to learn more about what we offer, and feel free to reach out to us with any questions or inquiries. We're excited to have you join us on this journey!
        </p>
      </div>
    </div>
  </div>
);
}

export default About