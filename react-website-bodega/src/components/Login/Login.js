import React, { useState } from 'react';
import './Login.css';
import useAuth from "../../hooks/useAuth";
import Alert from '@mui/material/Alert';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../services/AuthService";
import { Snackbar } from '@mui/material';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { setAuth } = useAuth();

  const TFUserName = (event) => {
    setUserName(event.target.value);
  }

  const TFPassword = (event) => {
    setPassword(event.target.value);
  }

  const checkInfo = (event) => {
    if (userName === "" && password === "") {
      setLoginError("Campos de nombre y contraseña vacíos.");
      setSnackbarOpen(true);
    } else if (userName === "") {
      setLoginError("Campo de nombre vacío.");
      setSnackbarOpen(true);
    } else if (password === "") {
      setLoginError("Campo de contraseña vacía.");
      setSnackbarOpen(true);
    } else {
      handleSubmit(event);
    }
  };
  

  const handleCloseSnackbar = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, roles, token } = await login({
        carne: userName,
        clave: password,
      });

      if (user) {
        setAuth({ user, roles, token });
        //navigate(from, { replace: true });
      } else {
        setLoginError("Credenciales incorrectas");
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error(err);
      setLoginError("Credenciales inválidas");
      setSnackbarOpen(true);
    }
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
            value={userName}
            placeholder='Carné'
            onChange={(e) => { TFUserName(e) }}
            style={{ marginBottom: '15px', width: '250px' }}
          />
          <input
            type="password"
            id="password"
            value={password}
            className='input-field'
            placeholder='Contraseña'
            onChange={(e) => { TFPassword(e) }}
            style={{ marginBottom: '15px', width: '250px' }}
          />
          <div className="forgot-password" style={{ marginBottom: '15px', width: '250px', textAlign: 'center' }}>
            <span onClick={() => { /* Agrega la lógica de redirección o acción deseada aquí */ }}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>
        </div>

        <button className='login-button' onClick={(e) => { checkInfo(e) }}>Iniciar sesión</button>
      </div>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000}>
        <Alert
          severity="error"
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

export default Login;