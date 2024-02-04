// RegisterCard.js
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { register } from '../../services/AuthService';
import './Register.css';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // Obtener instancia de axios privado para la solicitud de inicio de sesión
  const axiosPrivate = useAxiosPrivate();

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

  const cleanInputs = () => {
    setName('');
    setEmail('');
    setUserName('');
    setPassword('');
  };

  const checkInfo = (event) => {
    event.preventDefault();
    if (name === '' && email === '' && userName === '' && password === '') {
      setLoginError('Campos de información vacíos.');
      setSnackbarOpen(true);
    } else if (name === '') {
      setLoginError('Campo de nombre vacío.');
      setSnackbarOpen(true);
    } else if (email === '') {
      setLoginError('Campo de correo electrónico vacío.');
      setSnackbarOpen(true);
    } else if (userName === '') {
      setLoginError('Campo de username vacío.');
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
      console.log("PRUEBAs");
      const response = await register(
        axiosPrivate,
        {
          nombre: name,
          username: userName,
          correo: email,
          clave: password,
          rol: "ASISTENTE"
        });
      // Si la respuesta es correcta, muestra un mensaje de éxito y si no, muestra un mensaje de error
      if (response.success) {
        // Registration successful
        setType('success');
        setLoginError(response.message);
        setSnackbarOpen(true);
        cleanInputs();
      } else {
        setType('error');
        setLoginError(response.message);
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
      <h2 className="title-field">Registro de Asistentes</h2>
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
            type="text"
            id="username"
            value={userName}
            placeholder='Usuario'
            onChange={(e) => setUserName(e.target.value)}
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
