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
          <NavLink to="/contact">
            Contact
          </NavLink>
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
