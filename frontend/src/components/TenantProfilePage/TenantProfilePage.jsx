import React from "react";
import { useState, useRef } from "react";
import logo from "../../../public/sampleUser_img.png";
import "../../css/TenantProfilePageStyles/TenantProfilePage.css"; // Import the CSS specific to this component
import { useNavigate } from "react-router-dom";
export default function TenantProfilePage() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/tenant-edit-page");
  };
  return (
    <div className="tenant-profile-container">
      {/* Left Column */}
      <div className="tenant-profile-left-column">
        <img src={logo} alt="Profile" className="tenant-profile-photo" />
        <div className="tenant-bio-class">
          <p className="tenant-profile-bio">
            HI, I am Alexa Rawles, a software engineer working in microsoft in
            banglore. I am a responsible and tidy tenant who values a clean and
            peaceful living space. I am looking for an Appartment that suits my
            lifestyle. I have a steady income and i do always pays rent on time.
            I take pride in maintaining the property and being very respectable
            to neighbours . I would love to find a place i could treat as my
            own.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="tenant-profile-right-column">
        <div className="tenant-profile-details">
          <div className="tenant-profile-name">
            <p>
              <span>Full Name </span>
              <span>:</span>
              <span> Alexa Rawles</span>
            </p>
          </div>
          <div className="tenant-profile-mail">
            <p>
              <span>Email Address </span>
              <span>:</span> <span>alexarawles@gmail.com</span>
            </p>
          </div>
          <div className="tenant-profile-city">
            <p>
              <span>City</span>
              <span>:</span> <span>Bangalore</span>
            </p>
          </div>
          <div className="tenant-profile-locality">
            <p>
              <span>Locality </span>
              <span>:</span> <span>Koramangalam</span>
            </p>
          </div>
          <div className="tenant-profile-gender">
            <p>
              <span>Gender </span>
              <span>:</span> <span>Female</span>
            </p>
          </div>
          <div className="tenant-profile-smoke">
            <p>
              <span>Alcohol/smoking </span> <span>:</span> <span>Yes</span>
            </p>
          </div>
          <div className="tenant-profile-veg">
            <p>
              <span>Veg/Non Veg </span>
              <span>:</span> <span>Veg</span>
            </p>
          </div>
          <div className="tenant-profile-pets">
            <p>
              <span>Domesticated animals </span>
              <span>:</span> <span>Yes</span>
            </p>
          </div>
        </div>
        <button className="tenant-profile-edit-button" onClick={handleSubmit}>
          Edit
        </button>
      </div>
    </div>
  );
}
