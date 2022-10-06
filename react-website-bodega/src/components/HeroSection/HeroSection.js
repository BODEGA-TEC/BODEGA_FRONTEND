import React from 'react';
import { Button } from '../Button/Button';
import '../../App.css';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';


function HeroSection() {
  
  const navigate = useNavigate();
  
  const navigateToLocation = () => {
    navigate('/location');
  };

  const navigateToNews = () => {
    navigate('/news');
  };



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
          onClick={navigateToNews}
        >
          Noticias
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={navigateToLocation}
        >
          ¿Cómo llegar? <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
