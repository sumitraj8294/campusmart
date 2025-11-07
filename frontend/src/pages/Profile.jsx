import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Session expired. Please log in again.");
      return;
    }

    fetch("http://localhost:8080/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error(err);
        setError("Session expired or invalid token.");
        setTimeout(() => {
          handleLogout();
        }, 2000);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (error)
    return (
      <div className="profile-error">
        <h2>⚠️ {error}</h2>
        <button className="btn-logout" onClick={handleLogout}>
          Go to Login
        </button>
      </div>
    );

  if (!user) return <div className="loading">Loading your profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=00b894&color=fff&bold=true`}
            alt="User Avatar"
            className="profile-avatar"
          />
          <div>
            <h2>{user.name}</h2>
            <p className="profile-role">{user.role || "USER"}</p>
          </div>
        </div>

        <div className="profile-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Account Type:</strong>{" "}
            {user.role === "ADMIN" ? "Administrator" : "Regular User"}
          </p>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
