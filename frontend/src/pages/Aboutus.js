import React from 'react';
import './Aboutus.css';

function Aboutus() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
        <p className='para'>Your Trusted Partner in Homeopathic Healthcare</p>
      </div>
      <div className="about-container">
        <h2>Our Mission</h2>
        <p>
          At HomeoCare Hospital, we are dedicated to providing high-quality homeopathic healthcare
          services. Our mission is to promote holistic well-being through safe and effective
          homeopathic treatments.
        </p>

        <h2>Our Team</h2>
        <p>
          Our team of experienced and compassionate homeopathic practitioners is committed to
          understanding the unique needs of our patients and delivering personalized care.
        </p>

        <h2>Why Choose HomeoCare?</h2>
        <p>
          - Comprehensive and individualized homeopathic treatments
          <br />
          - State-of-the-art facilities and advanced diagnostic tools
          <br />
          - Patient-centric approach and a caring environment
          <br />
          - Proven track record of successful healing
        </p>

      </div>
    </div>
  );
}

export default Aboutus;
