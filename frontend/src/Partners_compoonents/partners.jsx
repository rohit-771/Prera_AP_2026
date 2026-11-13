import './Partners.css';
import React from "react";
import Nav from '../Navbar.jsx';


import redbull from '../assets/partners/redbill.png';
import canva from '../assets/partners/canva.png';
import axure from '../assets/partners/axure.png';
import denver from '../assets/partners/denver.png';
import dell from '../assets/partners/dell.png';
import truescholar from '../assets/partners/truescholar.png';
import patym from '../assets/partners/patym.png';
import hell from '../assets/partners/hell.png';
import abhibus from '../assets/partners/abhibus.png';
import unstop from '../assets/partners/unstop.png';
import dominos from '../assets/partners/dominos.png';
import unibazar from '../assets/partners/unibazar.png';

function Partners() {

  const partners = [
    { src: redbull, name: "Red Bull" },
    { src: canva, name: "Canva" },
    { src: axure, name: "Axure" },
    { src: denver, name: "Denver" },
    { src: dell, name: "Dell" },
    { src: truescholar, name: "TrueScholar" },
    { src: patym, name: "Patym" },
    { src: hell, name: "Hell" },
    { src: abhibus, name: "Abhibus" },
    { src: unstop, name: "Unstop" },
    { src: dominos, name: "Dominos" },
    { src: unibazar, name: "Unibazar" },
  ];

  return (
    <div className="partnerPage">
      <div className="partnerTop">
        <h1 className="mainHeading">
          OUR <span>PARTNERS</span>
        </h1>
        <p className="subText">
          We collaborate with leading brands to create impactful event
          experiences and meaningful partnerships.
        </p>
      </div>

      <div className="logoGrid">
        {partners.map((partner, index) => (
          <div key={index} className="logoBox">
            <img src={partner.src} alt={partner.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partners;