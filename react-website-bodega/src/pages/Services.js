import React, { useState } from 'react';
import '../App/App.css';
import { Tab, TabContent } from '../components/Tab/Tab';
import Footer from '../components/Footer/Footer';
export default function Services() {
  const [activeTab, setActiveTab] = useState('¿Quiénes somos?');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="card-container">
        <div className='card-wrapper'>
          <Tab tabName="¿Quiénes somos?" activeTab={activeTab} handleTabClick={handleTabClick} />
          <Tab tabName="¿Cómo funciona?" activeTab={activeTab} handleTabClick={handleTabClick} />
          <Tab tabName="Ubicación" activeTab={activeTab} handleTabClick={handleTabClick} />
          <Tab tabName="Horario" activeTab={activeTab} handleTabClick={handleTabClick} />
          <Tab tabName="Servicios disponibles" activeTab={activeTab} handleTabClick={handleTabClick} />
          <Tab tabName="Términos de servicio" activeTab={activeTab} handleTabClick={handleTabClick} />
        </div>

        <div className='card-information'>
          <TabContent activeTab={activeTab} />
        </div>
      </div>
      <Footer />
    </>
  );
}
