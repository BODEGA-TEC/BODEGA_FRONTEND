// RegisterCard.js
import React, { useState } from 'react';
import './Register.css';

const Register = ({ onToggleView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [carne, setCarne] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar datos antes de enviarlos
    // if (name.trim() === '' || email.trim() === '' || carne.trim() === '') {
    //   alert('Por favor, complete todos los campos.');
    //   return;
    // }

    onToggleView();
  };

  return (
    <div className="register-card-container">
      <h2 className="title-field">Registro</h2>
      <form className="register-input" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            placeholder='Nombre'
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            style={{marginBottom: '5%', width: '250px'}}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Correo electrónico'
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            style={{marginBottom: '5%', width: '250px'}}
          />
        </div>
        <div>
          <input
            type="text"
            id="carne"
            value={carne}
            placeholder='Carné'
            onChange={(e) => setCarne(e.target.value)}
            className="input-field"
            style={{marginBottom: '5%', width: '250px'}}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Contraseña'
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            style={{ width: '250px'}}
          />
        </div>
        <button type="submit" className="register-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
