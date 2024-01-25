import React, { useState } from 'react';
import './Login.css';
import useAuth from "../../hooks/useAuth";
import Alert from '@mui/material/Alert';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../services/AuthService";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [alertUserVisible, setAlertUserVisible] = useState(false);
  const [alertUserMessage, setAlertUserMessage] = useState("");

  const [alertPasswordVisible, setAlertPasswordVisible] = useState(false);
  const [alertPasswordMessage, setAlertPasswordMessage] = useState("");

  const { setAuth } = useAuth();

  const TFUserName = (event) => {
    setUserName(event.target.value);
  }

  const TFPassword = (event) => {
    setPassword(event.target.value);
  }

  const checkInfo = (event) => {
    if (userName === "" || password === "") {
      if (userName === "") {
        setAlertUserMessage("Campo de nombre vacío.");
        setAlertUserVisible(true);
      }
      if (password === "") {
        setAlertPasswordMessage("Campo de contraseña vacía.");
        setAlertPasswordVisible(true);
      }
    } else {
      handleSubmit(event);
    }
  }


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
        setAlertPasswordMessage("Información incorrecta.");
        setAlertPasswordVisible(true);
      }
    } catch (err) {
      setAlertPasswordMessage(err);
      setAlertPasswordVisible(true);
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
          <div>
            {alertUserVisible && (
              <Alert
                severity="error"
                onClose={() => setAlertUserVisible(false)}
                sx={{ maxWidth: '250px', maxHeight: '100px', marginBottom: '10px', marginTop: '-20px' }}
              >
                {alertUserMessage}
              </Alert>
            )}
          </div>
          <input
            type="password"
            id="password"
            value={password}
            className='input-field'
            placeholder='Contraseña'
            onChange={(e) => { TFPassword(e) }}
            style={{ marginBottom: '15px', width: '250px' }}
          />
          <div>
            {alertPasswordVisible && (
              <Alert
                severity="error"
                onClose={() => setAlertPasswordVisible(false)}
                sx={{ maxWidth: '250px', maxHeight: '100px', marginBottom: '10px', marginTop: '-20px' }}
              >
                {alertPasswordMessage}
              </Alert>
            )}
          </div>
          <div className="forgot-password" style={{ marginBottom: '15px', width: '250px', textAlign: 'center' }}>
            <span onClick={() => { /* Agrega la lógica de redirección o acción deseada aquí */ }}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>
        </div>

        <button className='login-button' onClick={(e) => { checkInfo(e) }}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Login;