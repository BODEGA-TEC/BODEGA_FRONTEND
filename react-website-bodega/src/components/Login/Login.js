import React, { useState } from 'react';
import './Login.css';
import { TextField } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here (e.g., send a request to your server)
  };

  return (
    <div>
      <div className="login-container">
        <h2 className='title-field'>Iniciar sesión</h2>
        <div className="login-input">
          <input
            type="text"
            id="username"
            className='input-field'
            value={username}
            placeholder='Carné'
            onChange={(e) => setUsername(e.target.value)}
            style={{marginBottom: '10%', width: '250px'}}
          />
          <input
            type="password"
            id="password"
            value={password}
            className='input-field'
            placeholder='Contraseña'
            onChange={(e) => setPassword(e.target.value)}
            style={{marginBottom: '10%', width: '250px'}}
          />
        </div>
          <button className='login-button'>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Login;