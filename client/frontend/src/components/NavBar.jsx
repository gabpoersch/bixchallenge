import React from 'react';
import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('access'); 
    localStorage.removeItem('refresh'); 

    navigate('/login');

  }

  return (
    <nav className="navbar">
      <div className="logo">BIX CHALLENGE</div>
      <div className="nav-items">
        <a href="/company">Companies</a>
        <a href="/employee">Employees</a>
        <a href="/timeline">Timeline</a>
      </div>
      <button onClick={logout} className="logout-button">Logout</button>
    </nav>
  );
};

export default NavBar;
