import React from 'react';
import logo from '../../images/logo-branca.png';
import './index.css';

const Header = () => (
  <nav>
    <div className="nav-wrapper blue">
      <a href="/" className="brand-logo">
        <img src={logo} alt="pluviam" />
        pluviam
      </a>
      <ul className="right hide-on-med-and-down">
        <li>
          <a href="contact">
            Contato
          </a>
        </li>
        <li>
          <a href="about">
            Sobre
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
