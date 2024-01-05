import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-link-wrapper'>
        <div className='footer-links'>
          <div className='footer-link-items'>
            <Link to='/'>
              <a>Sobre Nosotros</a>
            </Link>
          </div>
        </div>
        <div className='footer-links'>
          <div className='social-icons'>
            <a className='social-icon-link facebook' target="_blank" rel="noreferrer"
              href="https://www.facebook.com/BodegaIETEC">
              <i className='fab fa-facebook' />
            </a>

            <a className='social-icon-link instagram' target="_blank" rel="noreferrer"
              href="https://www.instagram.com/bodega_ie/">
              <i className='fab fa-instagram' />
            </a>

            <a className='social-icon-link discord' target="_blank" rel="noreferrer"
              href="https://discord.com/invite/3J33MBZ">
              <i className='fab fa-discord' />
            </a>

          </div>
          <div className='footer-link-items'>
            <p className='p-italic'>
              (+506) 1234-5678
            </p>
            <p className='p-italic'>
              contacto.bodegaie@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
