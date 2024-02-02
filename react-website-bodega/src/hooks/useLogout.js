import axios from "../services/api";
import useAuth from "./useAuth";

const useLogout = () => {
  // Obtiene la función setAuth del contexto de autenticación
  const { auth, setAuth } = useAuth();

  // Define la función logout para realizar la operación de cierre de sesión
  const logout = async () => {
    // Limpia el estado de autenticación (setea el contexto de autenticación a un objeto vacío)
    const tokenRequest = {
      accessToken: auth.accessToken,
    };

    setAuth({});

    try {
      // Intenta realizar una solicitud a la ruta /logout en el servidor para cerrar la sesión del usuario
      const response = await axios.post("/logout", tokenRequest, {
        withCredentials: true, // Incluye las credenciales (cookies) en la solicitud
      });

      console.log("logout", response);
    } catch (err) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error(err);
    }
  };

  // Devuelve la función logout, que puede ser utilizada para cerrar sesión en la aplicación
  return logout;
};

export default useLogout;
