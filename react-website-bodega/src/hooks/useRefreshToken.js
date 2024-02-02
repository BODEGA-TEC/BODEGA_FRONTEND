import useAuth from "./useAuth";
import axios from "../services/api";

const REFRESH_TOKEN_ENDPOINT = "/refresh-token";

const useRefreshToken = () => {
  // Obtiene la función setAuth del contexto de autenticación
  const { auth, setAuth } = useAuth();

  // Función para actualizar el token de acceso
  const refresh = async () => {
    // Realiza una solicitud para obtener un nuevo token de acceso
    const response = await axios.post(REFRESH_TOKEN_ENDPOINT, {
      usuarioId: auth.id,
      accessTokenExpirado: auth.accessToken,
      refreshToken: auth.refreshToken,
    });

    const { accessToken, refreshToken } = response.data.data;

    // Actualiza el estado de autenticación con los nuevos tokens
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log("Access", accessToken);

      // Devuelve un nuevo objeto de autenticación con los tokens actualizados
      return {
        ...prev,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    });

    // Devuelve el nuevo token de acceso
    return accessToken;
  };

  // Devuelve la función refresh para su uso
  return refresh;
};

export default useRefreshToken;
