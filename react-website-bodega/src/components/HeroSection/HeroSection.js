import React from 'react';
import { Button } from '../Button/Button';
import '../../App.css';

import './HeroSection.css';

function HeroSection() {
    return (
      <div className='hero-container'>
        {/* To change from video to image background go to HeroSection.css
        .hero-container section and uncomment background url image,
        also comment the video line below.*/}
        <video src='/videos/video-2.mp4' autoPlay loop muted />
        <h1>BODEGA ELECTRÓNICA </h1>
        <p> Bienvenido al Servicio de Préstamo de Equipo y
          Componentes de la Escuela de Electrónica del
          Instituto Tecnológico de Costa Rica</p>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            ---------
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}
          >
            ------ <i className='far fa-play-circle' />
          </Button>
        </div>
      </div>
    );
}

export default HeroSection;
