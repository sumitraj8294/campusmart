import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change or ESC press
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav className="cm-nav">
      <div className="cm-nav__bar">
        {/* Logo */}
        <Link to="/" className="cm-nav__logo">
          CampusMart
        </Link>

        {/* Desktop Links */}
        <div className="cm-nav__links">
          <Link to="/">Home</Link>
          <Link to="/my-listings">My Listings</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login" className="cm-btn cm-btn--primary">
            Login
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="cm-nav__hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <aside className={`cm-drawer ${open ? "is-open" : ""}`} role="dialog" aria-modal="true">
        {/* Close button inside the drawer */}
        <button
          className="cm-drawer__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="cm-drawer__content">
          <Link to="/">Home</Link>
          <Link to="/mylistings">My Listings</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login" className="cm-btn cm-btn--primary">
            Login
          </Link>
        </div>
      </aside>

      {/* Background Overlay */}
      {open && <div className="cm-overlay" onClick={() => setOpen(false)} />}
    </nav>
  );
}
