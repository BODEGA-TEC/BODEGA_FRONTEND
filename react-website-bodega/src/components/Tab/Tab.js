import React from 'react';

const Tab = ({ tabName, activeTab, handleTabClick }) => (
  <p onClick={() => handleTabClick(tabName)} className={activeTab === tabName ? 'active' : ''} style={{ marginBottom: '10px' }}>
    {tabName}
  </p>
);

const TabContent = ({ activeTab }) => {
  if (activeTab === '¿Quiénes somos?') {
    return <p>Bodega tiene la función de brindar un servicio de préstamo de equipos y componentes a los estudiantes de la Escuela de Electrónica del Tecnológico de Costa Rica. Gracias a esto, los estudiantes pueden tener acceso gratuito a equipo costoso, que es necesario para sus cursos.</p>;
  } else if (activeTab === 'Términos de servicio') {
    return (
      <div>
        <p>1. El servicio de bodega está condicionado al uso adecuado de los dispositivos entregados. En caso de encontrarse algún daño en el dispositivo a la hora de su entrega, el usuario del servicio está obligado a reponer el equipo con uno de las mismas características, o dar una compensación monetaria, equivalente al equipo en cuestión.</p>
        <p>2. Para el retiro y la devolución de equipo, se requerirá una boleta debidamente firmada y sellada, tanto por el profesor del curso, a como por el asistente de bodega que esté realizando la entrega del equipo prestado.</p>
        <p>3. Solo los estudiantes pertenecientes a la Escuela de Ingeniería en Electrónica del Tecnológico de Costa Rica, tienen derecho a este servicio.</p>
      </div>
    )
  } else if (activeTab === '¿Cómo funciona?') {
    return <p>Para acceder a un préstamo, se han de completar los datos presentes en la boleta que se puede encontrar en esta misma página en la sección de Formularios. El profesor del curso por el cual se pidió el equipo, también tiene que firmar la boleta, dando fe de la necesidad del equipo. Luego, el estudiante se tiene que diriger a las instalaciones físicas, donde tendrá que retirar el equipo con los asistentes. Finalmente, completado el periodo de uso, se tendrá que devolver en las mismas condiciones a como se retiró, y seguir los pasos de devolución con los asistentes.</p>;
  } else if (activeTab === 'Ubicación') {
    return (
      <div>
        <p>Bodega está ubicada en la Sede Central del Tecnológico de Costa Rica en Cartago, específicamente, en el aula 113 del primer piso del edificio de Electrónica ubicado en el bloque K.</p>
        <a href='https://www.google.com/maps/place/Escuela+de+Ingenier%C3%ADa+Electr%C3%B3nica.+TEC/@9.8547925,-83.907679,18.75z/data=!4m12!1m6!3m5!1s0x8fa0dff29640d73b:0xc11e19b85da8947f!2sTecnol%C3%B3gico+de+Costa+Rica!8m2!3d9.857247!4d-83.912313!3m4!1s0x0:0xff093cc7301877ce!8m2!3d9.8548824!4d-83.9071411?hl=es-419'>Ver ubicación en Maps</a>
      </div>
    )
  } else if (activeTab === 'Horario') {
    return (
      <div>
        <p>De Lunes a Viernes: 7:30 am a 8:30 pm</p>
        <p>Sábados (Atención virtual 💻): 12:00 md a 4:30 pm</p>
      </div>
    );
  } else if (activeTab === 'Servicios disponibles') {
    return (
      <div>
        <p>- Préstamo de microcontroladores</p>
        <p>- Préstamo de componentes (resistencias, capacitores...)</p>
        <p>- Préstamo de equipo de medición (osciloscopios, testers...)</p>
        <p>- Préstamo de integrados</p>
      </div>
    )
  }
  return null;
};

export { Tab, TabContent };
