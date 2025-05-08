import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Cerrar el menú en móvil después de hacer clic
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">InfoDivisas</span>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li className="navbar-item">
            <button onClick={() => scrollToSection('dollar-value')}>
              Valor Actual
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => scrollToSection('historical-comparison')}>
              Comparar Histórico
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => scrollToSection('currency-converter')}>
              Conversor
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => scrollToSection('dollar-chart')}>
              Histórico
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 