import useAuth from "./useAuth";
import axios from "../services/api";

const REFRESH_TOKEN_ENDPOINT = "/refresh-token";

const useRefreshToken = () => {
  // Obtiene la función setAuth del contexto de autenticación
  const { auth, setAuth } = useAuth();

  // Función para actualizar el token de acceso
  const refresh = async () => {
    // Realiza una solicitud para obtener un nuevo token de acceso
    const response = await axios.get(REFRESH_TOKEN_ENDPOINT, {
      withCredentials: true,
    });

    const { id, nombre, rol, accessToken } = response.data.data;

    // Actualiza el estado de autenticación con los nuevos tokens
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log("Access", accessToken);
      // console.log("Rol", rol);
      // console.log("id", id);
      // console.log("nombre", nombre);

      // Devuelve un nuevo objeto de autenticación con los tokens actualizados
      return {
        ...prev,
        id: id,
        nombre: nombre,
        rol: rol,
        accessToken: accessToken,
      };
    });

    // Devuelve el nuevo token de acceso
    return accessToken;
  };

  // Devuelve la función refresh para su uso
  return refresh;
};

export default useRefreshToken;
