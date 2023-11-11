import React from 'react';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">BIX CHALLENGE</div>
      <div className="nav-items">
        <a href="/company">Companies</a>
        <a href="/employee">Employees</a>
        <a href="/timeline">Timeline</a>
      </div>
      <button className="logout-button">Logout</button>
    </nav>
  );
};

export default NavBar;
