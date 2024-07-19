import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = ({ setShowArchived }) => {
  const [activeTab, setActiveTab] = useState('inbox');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowArchived(tab === 'archives');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Call Logs</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button
              className={`nav-button ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => handleTabClick('inbox')}
            >
              Inbox
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-button ${activeTab === 'archives' ? 'active' : ''}`}
              onClick={() => handleTabClick('archives')}
            >
              Archives
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
