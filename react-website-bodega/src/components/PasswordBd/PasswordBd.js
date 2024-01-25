import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import "./PasswordBd.css";

const PasswordBd = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alertPasswordVisible, setAlertPasswordVisible] = useState(false);
  const [alertPasswordMessage, setAlertPasswordMessage] = useState("");

  const [alertConfirmPasswordVisible, setAlertConfirmPasswordVisible] = useState(false);
  const [alertConfirmPasswordMessage, setAlertConfirmPasswordMessage] = useState("");

  const TFPassword = (event) => {
    setPassword(event.target.value);
  };

  const TFConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const checkInfo = (event) => {
    if (confirmPassword === "" || password === "") {
      if (password === "") {
        setAlertPasswordMessage("Campo de contraseña vacío.");
        setAlertPasswordVisible(true);
      }
      if (confirmPassword === "") {
        setAlertConfirmPasswordMessage("Debe confirmar su contraseña.");
        setAlertConfirmPasswordVisible(true);
      }
    } else {
      if (password !== confirmPassword) {
        setAlertConfirmPasswordMessage("Las contraseñas no coinciden.");
        setAlertConfirmPasswordVisible(true);
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
          <input
            type="password"
            id="confirmPassword"
            className='input-field-password'
            value={confirmPassword}
            placeholder='Confirmar contraseña'
            onChange={(e) => { TFConfirmPassword(e) }}
            style={{ marginBottom: '15px', width: '250px' }}
          />
          <div>
            {alertConfirmPasswordVisible && (
              <Alert
                severity="error"
                onClose={() => setAlertConfirmPasswordVisible(false)}
                sx={{ maxWidth: '250px', maxHeight: '100px', marginBottom: '10px', marginTop: '-20px' }}
              >
                {alertConfirmPasswordMessage}
              </Alert>
            )}
          </div>
          <button className='password-button' onClick={(e) => checkInfo(e)}>Cambiar contraseña</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordBd;