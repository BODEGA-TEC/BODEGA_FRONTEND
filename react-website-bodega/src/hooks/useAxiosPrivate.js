import axios from "../services/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    // Intercepta las solicitudes para agregar el token de acceso a la cabecera
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          // Agregar token de acceso a la cabecera de la solicitud si no está presente
          // (puede ser el access token obtenido a partir del login, o el que se obtuvo despues de un refresh)
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepta las respuestas para manejar la renovación del token de acceso
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // Verifica si la respuesta fue un código 403 (Forbidden) o BadRequest y si no se ha intentado reenviar la solicitud previamente
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          // Renueva el token de acceso
          const newAccessToken = await refresh();
          // Actualiza la cabecera de autorización con el nuevo token de acceso
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // Reenvía la solicitud con el nuevo token de acceso
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Se ejecuta al desmontar el componente o cuando cambian las dependencias
    return () => {
      // Elimina los interceptores de solicitud y respuesta para evitar fugas de memoria
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]); // Se ejecuta cuando cambian las dependencias auth y refresh

  // Devuelve axios, que puede ser utilizado para hacer solicitudes HTTP
  return axios;
};

export default useAxiosPrivate;
