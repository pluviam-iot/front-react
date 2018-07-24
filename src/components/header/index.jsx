import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-branca.png';
import './index.css';

const Header = () => (
  <nav>
    <div className="nav-wrapper blue">
      <NavLink to="/" className="brand-logo">
        <img src={logo} alt="pluviam" />
        pluviam
      </NavLink>
      <ul className="right hide-on-med-and-down">
        <li>
          <a
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSf5OUXv_KVQFwYzz4a8obBeRoSRbVNpBYHIY3k3BIH_WhmkkA/viewform?c=0&w=1"
            target="_blank"
          >
            Contato
          </a>
        </li>
        <li>
          <NavLink to="/about">
            Sobre
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
