import React from 'react';
import './Footer.css';
// import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-link-wrapper'>
        <div class='footer-links'>
            <div class='footer-link-items'>
              <h2>Sobre Nosotros</h2>
              <Link to='/services'>¿Cómo funciona?</Link>
              <Link to='/'>Ubicación</Link>
              <Link to='/'>Términos de servicio</Link>
            </div>
      </div>
      
        <div class='footer-links'>
          <div class='footer-link-items'>
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

      <section class='social-media'>

        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <a className='social-logo' href="/">
              Bodega Web <img class='bodega-logo' src='/logo.png' alt='logo' />
            </a>
          </div>

          <small class='website-rights'> Copyright © {new Date().getFullYear()} hecho con ❤️ por el equipo de desarrollo de Bodega Web</small>
          
          <div class='social-icons'>
            <a class='social-icon-link facebook' target="_blank" rel="noreferrer"
              href="https://www.facebook.com/BodegaIETEC">
              <i class='fab fa-facebook' />
            </a>

            <a class='social-icon-link instagram' target="_blank" rel="noreferrer"
              href="https://www.instagram.com/bodega_ie/">
              <i class='fab fa-instagram' />
            </a>

            <a class='social-icon-link discord' target="_blank" rel="noreferrer"
              href="https://discord.com/invite/3J33MBZ">
              <i class='fab fa-discord' />
            </a>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
