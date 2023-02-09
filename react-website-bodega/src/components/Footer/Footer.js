import React from 'react';
import './Footer.css';
// import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-link-wrapper'>
        <div className='footer-links'>
            <div className='footer-link-items'>
              <h2>Sobre Nosotros</h2>
              <Link to='/services'>¿Cómo funciona?</Link>
              <Link to='/services'>Ubicación</Link>
              <Link to='/terms'>Términos de servicio</Link>
            </div>
      </div>
      
        <div className='footer-links'>
          <div className='footer-link-items'>
            <h2>Contáctenos</h2>
            <p>Teléfono:</p>
            <p className='p-italic'>
              (+506) 1234-5678
            </p>
            <p>Correo:</p>
         
            <p className='p-italic'>
              contacto.bodegaie@gmail.com
            </p>
          </div>
        </div>
      </div>

      <section className='social-media'>

        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <a className='social-logo' href="/">
              Bodega Web <img className='bodega-logo' src='/logo.png' alt='logo' />
            </a>
          </div>

          <small className='website-rights'> Copyright © {new Date().getFullYear()} hecho con ❤️ por el equipo de desarrollo de Bodega Web</small>
          
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
        </div>
      </section>
    </div>
  );
}

export default Footer;
