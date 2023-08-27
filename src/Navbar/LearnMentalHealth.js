import React from "react";
import learn from "../Images/learn_img.jpg";
import NavBar from "./Navbar";

export const LearnMentalHealth = () => {
  return (
    <div className="learn-class-container">
      <NavBar />
      <div className="learn-class">
        <div className="learn-image">
          <img src={learn} alt="hello" />
        </div>
        <div className="learn-container">
          <h1>What is mental health?</h1>
          <br />
          <p>
            Mental health refers to a person's emotional, psychological, and
            social well-being. It involves how individuals think, feel, and
            behave, as well as how they handle stress, relate to others, and
            make choices. Good mental health contributes to overall life
            satisfaction, the ability to cope with challenges, and the capacity
            to build and maintain meaningful relationships. On the other hand,
            poor mental health can lead to various emotional and behavioral
            struggles, affecting a person's daily functioning and quality of
            life. It's important to recognize that mental health is a continuum,
            and everyone experiences ups and downs in their mental well-being
            over time.
          </p>
        </div>
      </div>
    </div>
  );
};
