import React, { useState } from "react";
import "./Login.css";
import useAuth from "../../hooks/useAuth";
import Alert from "@mui/material/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../services/AuthService";
import { Snackbar } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Login = () => {
  // Obtener instancia de axios privado para la solicitud de inicio de sesión
  const axiosPrivate = useAxiosPrivate();

  // Estado para el nombre de usuario y contraseña
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Estado para manejar el Snackbar de errores
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Obtener funciones de autenticación y enrutamiento
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la ruta de redirección después del inicio de sesión
  const from = location.state?.from?.pathname || "/";

  // Manejadores de cambio para los campos de usuario y contraseña
  const TFUserName = (event) => {
    setUserName(event.target.value);
  };

  const TFPassword = (event) => {
    setPassword(event.target.value);
  };

  // Verificar la información antes de enviar el formulario
  const checkInfo = (event) => {
    if (userName === "" && password === "") {
      setLoginError("Campos de usuario y contraseña vacíos.");
      setSnackbarOpen(true);
    } else if (userName === "") {
      setLoginError("Campo de usuario vacío.");
      setSnackbarOpen(true);
    } else if (password === "") {
      setLoginError("Campo de contraseña vacía.");
      setSnackbarOpen(true);
    } else {
      handleSubmit(event);
    }
  };

  // Manejador para cerrar el Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Manejador para enviar el formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, nombre, rol, accessToken, refreshToken } = await login(
        axiosPrivate,
        {
          username: userName,
          clave: password,
        }
      );
      setAuth({ id, nombre, rol, accessToken, refreshToken });
      navigate(from, { replace: true }); // Navegar devuelta al lugar de donde viene la solicitud
    } catch (err) {
      setLoginError(err);
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2 className="title-field">Iniciar sesión</h2>
        <div className="login-input">
          <input
            type="text"
            id="username"
            className="input-field"
            value={userName}
            placeholder="Usuario"
            onChange={(e) => {
              TFUserName(e);
            }}
            style={{ marginBottom: "15px", width: "250px" }}
          />
          <input
            type="password"
            id="password"
            value={password}
            className="input-field"
            placeholder="Contraseña"
            onChange={(e) => {
              TFPassword(e);
            }}
            style={{ marginBottom: "15px", width: "250px" }}
          />
          <div
            className="forgot-password"
            style={{
              marginBottom: "15px",
              width: "250px",
              textAlign: "center",
            }}
          >
            <span
              onClick={() => {
                /* Agrega la lógica de redirección o acción deseada aquí */
              }}
            >
              ¿Olvidaste tu contraseña?
            </span>
          </div>
        </div>

        <button
          className="login-button"
          onClick={(e) => {
            checkInfo(e);
          }}
        >
          Iniciar sesión
        </button>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000}>
        <Alert
          severity="error"
          variant="filled"
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
        >
          {loginError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
