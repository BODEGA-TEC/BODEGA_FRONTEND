import React from "react";
import "../../App/App.css";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      {/* To change from video to image background go to HeroSection.css
      .hero-container section and uncomment background url image,
      also comment the video line below.*/}
      {/* <video src='/videos/video-2.mp4' autoPlay loop muted /> */}
      <h1>BODEGA ELECTRÓNICA </h1>
      <p>
        {" "}
        Bienvenido al Servicio de Préstamo de Equipo y Componentes de la Escuela
        de Electrónica del Instituto Tecnológico de Costa Rica
      </p>
    </div>
  );
}

export default HeroSection;
