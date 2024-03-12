import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/add">
                  Add Products
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button onClick={handleLogout} style={{ textDecoration: 'none', color: 'black', border: 'none', background: 'none', cursor: 'pointer' }}>Logout</button>
      </div>
    </div>
  );
}
