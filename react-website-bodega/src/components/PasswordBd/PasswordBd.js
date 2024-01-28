import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from '@mui/material';
import "./PasswordBd.css";

const PasswordBd = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleCloseSnackbar = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const TFPassword = (event) => {
    setPassword(event.target.value);
  };

  const TFConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const checkInfo = (event) => {
    if (confirmPassword === "" && password === "") {
      setLoginError("Campos de contraseña vacíos.");
      setSnackbarOpen(true);
    } else if (password === "") {
      setLoginError("Campo de contraseña vacío.");
      setSnackbarOpen(true);
    } else if (confirmPassword === "") {
      setLoginError("Debe confirmar su contraseña.");
      setSnackbarOpen(true);
    } else {
      if (password !== confirmPassword) {
        setLoginError("Las contraseñas no coinciden.");
        setSnackbarOpen(true);
      } else {
        handleSubmit(event);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Contraseña cambiada");
  };

  return (
    <div>
      <div className="password-container">
        <h2 className='title-password'>Mantenimiento de la base de datos</h2>
        <div className="password-input">
          <input
            type="password"
            id="password"
            className='input-field-password'
            value={password}
            placeholder='Contraseña'
            onChange={(e) => { TFPassword(e) }}
            style={{ marginBottom: '15px', width: '250px' }}
          />
          <input
            type="password"
            id="confirmPassword"
            className='input-field-password'
            value={confirmPassword}
            placeholder='Confirmar contraseña'
            onChange={(e) => { TFConfirmPassword(e) }}
            style={{ marginBottom: '15px', width: '250px' }}
          />
          <button className='password-button' onClick={(e) => checkInfo(e)}>Cambiar contraseña</button>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
      >
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
}

export default PasswordBd;