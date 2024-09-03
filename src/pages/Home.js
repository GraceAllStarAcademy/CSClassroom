import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Grace All-Star Academy's Computer Science Class</h1>
          <p>Inspiring Tomorrow's Innovators Today</p>
          <a href="#introduction" className="cta-button">Explore Our Classes</a>
        </div>
      </section>

      {/* Introduction Video/Slideshow */}
      <section id="introduction" className="introduction-section">
        <h2>Introduction to Our Class</h2>
        <div className="video-container">
          {/* Placeholder for video or slideshow */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YPE2dO5sII0?si=WhwbX0Ogi-mIcqJH"
            title="Introduction Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>Our mission is to foster creativity, critical thinking, and collaboration in a supportive learning environment.</p>
      </section>

      {/* Featured Student Projects */}
      <section className="projects-section">
        <h2>Featured Student Projects</h2>
        <div className="projects-container">
          {/* Placeholder for project carousel or grid */}
          <div className="project-item">Project 1</div>
          <div className="project-item">Project 2</div>
          <div className="project-item">Project 3</div>
        </div>
      </section>

      {/* Teacher Bio */}
      <section className="bio-section">
        <h2>Meet the Teacher</h2>
        <div className="bio-content">
          <img src='/src/my_photo.jpg' alt="" className="teacher-photo" />
          <p>Hi, I'm Mr. Jeff, a passionate educator with a deep love for computer science. My goal is to inspire students to become the next generation of innovators and problem-solvers.</p>
          <Link to="/portal" className="cta-button">Schedule a Meeting with Me</Link>
        </div>
      </section>

      {/* Contact Information */}
      <footer className="footer-section">
        <p>Contact me at: <a href="mailto:yihengy@graceallstaracademy.com">yihengy@graceallstaracademy.com</a></p>
        <p>Follow us on <a href="https://twitter.com/school">Twitter</a> | <a href="https://facebook.com/school">Facebook</a></p>
      </footer>
    </div>
  );
};

export default Home;
