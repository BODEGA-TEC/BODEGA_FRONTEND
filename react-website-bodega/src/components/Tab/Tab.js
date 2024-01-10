import React from 'react';

const Tab = ({ tabName, activeTab, handleTabClick }) => (
  <p onClick={() => handleTabClick(tabName)} className={activeTab === tabName ? 'active' : ''}>
    {tabName}
  </p>
);

const TabContent = ({ activeTab }) => {
  if (activeTab === 'Términos de servicio') {
    return <p>Contenido de Servicios</p>;
  } else if (activeTab === '¿Cómo funciona?') {
    return <p>Contenido de Cómo funciona</p>;
  } else if (activeTab === 'Ubicación') {
    return <p>Contenido de Ubicación</p>;
  }
  return null;
};

export { Tab, TabContent };
