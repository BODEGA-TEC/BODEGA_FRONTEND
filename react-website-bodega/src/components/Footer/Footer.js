import React from 'react';
import './Footer.css';
// import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>

      <div class='footer-links'>
        <div className='footer-link-wrapper'>

          <div class='footer-link-items'>
            <h2>Sobre Nosotros</h2>
            <Link to='/sign-up'>¿Cómo funciona?</Link>
            <Link to='/'>Ubicación</Link>
            <Link to='/'>Términos de servicio</Link>
          </div>
        </div>
      <div className='footer-link-wrapper'>
          <div class='footer-link-items' style={{ width: '270px'}}>
            <h2>Contáctenos</h2>
            <p>Teléfono: (506) XXXX-XXXX </p>
            <p>Correo: contacto.bodegaie@gmail.com</p>
          </div>

          <div class='footer-link-items'>
            <h2>Redes Sociales</h2>
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/BodegaIETEC">Facebook</a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/bodega_ie/">Instragram</a>
            <a target="_blank" rel="noreferrer" href="https://discord.com/invite/3J33MBZ">Discord</a>
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
  
            <Link
              class='social-icon-link facebook'
              to={{ pathname: "https://www.facebook.com" }}
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link discord'
              to='/'
              target='_blank'
              aria-label='Discord'
            >
              <i class='fab fa-discord' />
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
