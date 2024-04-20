import React from "react";
import "./About.css";

function About() {
  return (
    <div className="text-container">
      <h1 className="about-us">About Us</h1>
      <div>
        <span className="premier-text">
          <strong>EVENTURE</strong> - Your Premier Venue Booking Destination
        </span>
        <br />
        <br />
        At Eventure, we make finding the perfect venue for your event
        effortless. From weddings to corporate gatherings, we're dedicated to
        ensuring your special occasion is unforgettable.
        <br />
        <br />
        <div
          style={{
            backgroundColor: "black",
            height: "1px",
            width: "100%",
          }}
        />
        <br />
        <br />
        <strong>What Sets Us Apart:</strong>
        <br />
        <br />
      </div>
      <ul>
        <li>
          <strong>Customizable Experience:</strong> We offer top-notch venues
          tailored to your needs. Customize your event with catering and DJs,
          unlocking endless possibilities to elevate your experience.
        </li>
        <li>
          <strong>User-Friendly Chatbot:</strong> Our integrated chatbot
          provides instant assistance, from venue availability to pricing
          inquiries, guiding you every step of the way.
        </li>
        <li>
          <strong>Personalized Service:</strong> We prioritize your
          satisfaction, offering seamless booking experiences and access to
          diverse venues and services.
        </li>
      </ul>
      <br />
      <br />
      <div
        style={{
          backgroundColor: "black",
          height: "1px",
          width: "100%",
        }}
      />
      <br />
      <br />
      <p>
        Join us on this journey of celebration and discovery. Let{" "}
        <strong>Eventure</strong> be your partner in creating unforgettable
        memories.
      </p>
      <br />
      <br />
      <p>
        <strong>EVENTURE</strong> - Where Every Event Finds its Perfect Venue!
      </p>
      <br />
      <br />
    </div>
  );
}

export default About;
