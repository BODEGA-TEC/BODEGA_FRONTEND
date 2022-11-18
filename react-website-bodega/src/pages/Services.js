import React from 'react';
import '../App.css';
import Text from '../components/Text/Text';
import Footer from '../components/Footer/Footer';
import {Link, Route} from 'react-router-dom';
export default function Services() {
  return (
    <>
      <h1 className='services'>SERVICIOS DE BODEGA</h1>
      {/* pad: vertical horizontal*/}
      <div style={{textAlign: 'center', paddingTop: '50px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = '¿Quiénes somos?'
        />
        <Text
          text_style = 'text_normal'
          text = 'Bodega tiene la función de brindar un servicio de préstamo de equipos y componentes a los estudiantes de la Escuela de Electrónica del Tecnológico de Costa Rica. Gracias a esto, los estudiantes pueden tener acceso gratuito a equipo costoso, que es necesario para sus cursos.'
        />
      </div>
      <div style={{textAlign: 'center', paddingTop: '50px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = '¿Cómo funciona?'
        />
        <Text
          text_style = 'text_normal'
          text = 'Para acceder a un préstamo, se han de completar los datos presentes en la boleta que se puede encontrar en esta misma página en la sección de Formularios. El profesor del curso por el cual se pidió el equipo, también tiene que firmar la boleta, dando fe de la necesidad del equipo. Luego, el estudiante se tiene que diriger a las instalaciones físicas, donde tendrá que retirar el equipo con los asistentes. Finalmente, completado el periodo de uso, se tendrá que devolver en las mismas condiciones a como se retiró, y seguir los pasos de devolución con los asistentes.'
        />
      </div>
      <div style={{textAlign: 'center', paddingTop: '10px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = 'Servicios disponibles'
        />
        <Text
          text_style = 'text_normal'
          text = '- Préstamo de microcontroladores'
        />
        <Text
          text_style = 'text_normal'
          text = '- Préstamo de componentes (resistencias, capacitores...)'
        />
        <Text
          text_style = 'text_normal'
          text = '- Préstamo de equipo de medición (osciloscopios, testers...)'
        />
        <Text
          text_style = 'text_normal'
          text = '- Préstamo de integrados'
        />
      </div>
      <div style={{textAlign: 'center', paddingTop: '10px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = 'Horario'
        />
        <Text
          text_style = 'text_normal'
          text = 'De Lunes a Viernes: 7:30 am a 8:30 pm'
        />
        <Text
          text_style = 'text_normal'
          text = 'Sábados (Atención virtual 💻): 12:00 md a 4:30 pm'
        />
      </div>
      <div style={{textAlign: 'center', paddingTop: '10px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = 'Ubicación'
        />
        <Text
          text_style = 'text_normal'
          text = 'Bodega está ubicada en la Sede Central del Tecnológico de Costa Rica en Cartago, específicamente, en el aula 113 del primer piso del edificio de Electrónica ubicado en el bloque K.'
        />
        <a href='https://www.google.com/maps/place/Escuela+de+Ingenier%C3%ADa+Electr%C3%B3nica.+TEC/@9.8547925,-83.907679,18.75z/data=!4m12!1m6!3m5!1s0x8fa0dff29640d73b:0xc11e19b85da8947f!2sTecnol%C3%B3gico+de+Costa+Rica!8m2!3d9.857247!4d-83.912313!3m4!1s0x0:0xff093cc7301877ce!8m2!3d9.8548824!4d-83.9071411?hl=es-419'>Ver ubicación en Maps</a>
      </div>
      <div style={{textAlign: 'center', paddingTop: '10px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = 'Contactos'
        />
        <Text
          text_style = 'text_normal'
          text = 'Email 📧: contacto.bodegaie@gmail.com'
        />
        <Text
          text_style = 'text_normal'
          text = 'Server de Discord: '
        />
        <a href='https://discord.com/invite/3J33MBZ'>👾</a>
        <Text
          text_style = 'text_normal'
          text = 'Instagram: '
        />
        <a href='https://www.instagram.com/bodega_ie/'>📸</a>
      </div>
      <Footer/>
    </>
    
  ) ;
}
