// RegisterCard.js
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { register } from '../../services/AuthService';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [carne, setCarne] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [type, setType] = useState('error');

  const handleCloseSnackbar = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const checkInfo = (event) => {
    event.preventDefault();
    if (name === '' && email === '' && carne === '' && password === '') {
      setLoginError('Campos de información vacíos.');
      setSnackbarOpen(true);
    } else if (name === '') {
      setLoginError('Campo de nombre vacío.');
      setSnackbarOpen(true);
    } else if (email === '') {
      setLoginError('Campo de correo electrónico vacío.');
      setSnackbarOpen(true);
    } else if (carne === '') {
      setLoginError('Campo de carne vacío.');
      setSnackbarOpen(true);
    } else if (password === '') {
      setLoginError('Campo de contraseña vacío.');
      setSnackbarOpen(true);
    } else {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        nombre: name,
        correo: email,
        carne: carne,
        clave: password,
      });
      if (response.success) {
        // Registration successful
        setType('success');
        setLoginError('Registro exitoso');
        setSnackbarOpen(true);
      }
    }
    catch (err) {
      setType('error');
      setLoginError('Registro fallido');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="register-card-container">
      <h2 className="title-field">Registro</h2>
      <form className="register-input" onSubmit={checkInfo}>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            placeholder='Nombre'
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            style={{ marginBottom: '5%', width: '250px' }}
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
            style={{ marginBottom: '5%', width: '250px' }}
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
            style={{ marginBottom: '5%', width: '250px' }}
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
            style={{ width: '250px' }}
          />
        </div>
        <button type="submit" className="register-button">Registrarse</button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}>
        <Alert
          severity={type}
          variant='filled'
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          {loginError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
