import React from "react";
import "../CSS/About.css";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
// import Chirag from "../assets/chirag.png";
// import Aryan from "../assets/Aryan.png";

import Anindya from "../assets/Anindya.png";

function AboutTeam() {
  const team = [
    {
      name: "Chirag Antil",
      role: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/chiragantil/",
      instagram: "https://www.instagram.com/nst.techie_chirag/",
    },
    {
      name: "Aryan",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/aryan-sangwan-5a54b537a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/aryansangwan16?igsh=MXhkeGsxZDNmd2dpbw==",
      //   image:Aryan
    },
    {
      name: "Anindya Sarkar",
      role: "Partnership Head",
      linkedin: "https://www.linkedin.com/in/anindya-sarkar2007/",
      instagram: "https://www.instagram.com/ani03610/",
      image: Anindya
    },

  ];

  return (
    <section className="team">

      <div className="container">

        <h2 className="title">OUR TEAM</h2>

        <p className="subtitle">
          A passionate team working behind the scenes to build powerful collaborations
          and unforgettable experiences.
        </p>

        <div className="grid">
          {team.map((member, index) => (
            <div className="card" key={index}>

              <img src={member.image} alt={member.name} className="image" />

              <h3>{member.name}</h3>
              <p>{member.role}</p>

              <div className="icons">
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>

                <a href={member.instagram} target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}

export default AboutTeam;




