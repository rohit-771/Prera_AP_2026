import React from "react";
import "./Contact-page.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function ContactPage() {
  return (
    <div className="contactMain">

      <div className="contactWrapper">

        {/* LEFT SIDE */}
        <div className="contactLeft">

          <p className="smallText">GET IN TOUCH</p>

          <h1 className="heading">
            LET'S <span>CONNECT</span>
          </h1>

          <p className="subText">
            Have an event in mind or want to partner with PRERA? Let’s talk.
            We’re here to connect brands and events in the most impactful way.
          </p>

          <div className="contactInfo">

            <div className="infoItem">
              <FaEnvelope className="icon" />
              <p>team.prera@gmail.com</p>
            </div>

            <div className="infoItem">
              <FaPhone className="icon" />
              <p>+91 7404972825</p>
            </div>

            <div className="infoItem">
              <FaMapMarkerAlt className="icon" />
              <p>Rishihood university</p>
            </div>

          </div>

          <div className="socialIcons">

            <a 
                href="https://www.linkedin.com/company/preraofficial/?viewAsMember=true" 
                target="_blank" 
                rel="noreferrer"
            >
                <FaLinkedin className="socialIcon" />
            </a>

            <a 
                href="https://www.instagram.com/prera_official/?hl=en" 
                target="_blank" 
                rel="noreferrer"
            >
                <FaInstagram className="socialIcon" />
            </a>

            </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="contactRight">

          <form className="formBox">

            <input type="text" placeholder="FULL NAME" className="input" />

            <input type="email" placeholder="EMAIL ADDRESS" className="input" />

            <input type="text" placeholder="PHONE NUMBER" className="input" />

            <textarea placeholder="YOUR MESSAGE" className="textarea"></textarea>

            <button className="btn">
              SEND MESSAGE →
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ContactPage;