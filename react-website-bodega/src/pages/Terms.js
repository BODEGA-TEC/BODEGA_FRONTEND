import React from 'react';
import '../App.css';
import Text from '../components/Text/Text';
import Footer from '../components/Footer/Footer';
export default function Terms() {
  return (
    <>
      <h1 className='services'>TÉRMINOS Y CONDICIONES</h1>
      {/* pad: vertical horizontal*/}
      <div style={{textAlign: 'center', paddingTop: '150px', marginLeft: "20%", marginRight: "20%", marginBottom: "150px"}}>
        <Text
          text_style = 'text_title'
          text = 'Términos y condiciones del servicio'
        />
        <Text
          text_style = 'text_normal'
          text = '1. El servicio de bodega está condicionado al uso adecuado de los dispositivos entregados. En caso de encontrarse algún daño en el dispositivo a la hora de su entrega, el usuario del servicio está obligado a reponer el equipo con uno de las mismas características, o dar una compensación monetaria, equivalente al equipo en cuestión.'
        />
        <Text
          text_style = 'text_normal'
          text = "2. Para el retiro y la devolución de equipo, se requerirá una boleta debidamente firmada y sellada, tanto por el profesor del curso, a como por el asistente de bodega que esté realizando la entrega del equipo prestado."
        />
        <Text
          text_style = 'text_normal'
          text = '3. Solo los estudiantes pertenecientes a la Escuela de Ingeniería en Electrónica del Tecnológico de Costa Rica, tienen derecho a este servicio.'
        />
      </div>
      <Footer/>
    </>
    
  ) ;
}


/*

*/