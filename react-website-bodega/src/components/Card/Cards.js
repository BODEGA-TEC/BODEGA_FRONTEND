import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Últimas noticias!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/wall-e.jpg'
              text='Nuevo bot creado para la consulta de información relevante.'
              label='Bot'
              path='/news'
            />
            <CardItem
              src='images/trump.jpg'
              text='Cinco osciloscopios nuevos han sido donados al ITCR por Donald Trump.'
              label='Equipo'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/prof-ie.jpg'
              text='La lista de contactos de profesores ha sido publicada.'
              label='Profesores IE'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Fuertes multas han sido impuestas por robo contínuo de componentes.'
              label='Riesgo'
              path='/services'
            />
            <CardItem
              src='images/img-home.jpg'
              text='En vista del posible incremento de presupuesto al FEST se espera una pronta actualización de equipo.'
              label='Equipo'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
