import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* --- Left Section: Logo & Description --- */}
        <div className="footer-section">
          <h2 className="footer-logo">CampusMart</h2>
          <p className="footer-desc">
            A student marketplace to buy, sell, and exchange essentials within your campus.
          </p>
        </div>

        {/* --- Middle Section: Quick Links --- */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/my-listings">My Listings</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {/* --- Right Section: Contact & Social --- */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@campusmart.in</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CampusMart • All Rights Reserved</p>
      </div>
    </footer>
  );
}
