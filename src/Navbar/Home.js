import axios from "axios";
import NavBar from "./Navbar";
import React from "react";
import { Nav } from "react-bootstrap";
import image from "../Images/home_img.png";
import { useNavigate } from "react-router-dom";
import image2 from "../Images/Anxiety.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home_background">
      <div className="custom-shape-divider-top-1692503535">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M649.97 0L550.03 0 599.91 54.12 649.97 0z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <NavBar />
      <div className="container">
        <div className="home_section">
          <div className="home_text_section">
            <h1>Find your way to a</h1>
            <h2>
              <b>Stronger Self</b>
            </h2>
            <p className="text">
              Vitalize Mind promised to deliever every possible way to contribute to
              the well being of each individual. The betterment of mental health
              is an essential and ongoing endeavor that seeks to enhance the
              overall well-being of individuals and communities. Through
              awareness, understanding, and access to proper resources, society
              can cultivate an environment that supports mental wellness. By
              fostering a compassionate and empathetic atmosphere, we can
              empower individuals to seek help when needed, prioritize their
              mental health, and ultimately lead happier and more fulfilling
              lives.
            </p>
            <button className="getStarted" onClick={() => navigate("/signup")}>
              <h5>Get Started</h5>
            </button>
          </div>
          <div className="home_image_section">
            <img className="home_image" src={image}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
