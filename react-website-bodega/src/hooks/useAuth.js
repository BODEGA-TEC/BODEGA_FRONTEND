import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  // Obtener el contexto de autenticación
  const { auth } = useContext(AuthContext);

  // Utiliza useDebugValue para proporcionar información sobre el estado de autenticación en las herramientas de desarrollo de React
  useDebugValue(auth, (auth) => (auth?.nombre ? "Logged In" : "Logged Out"));

  // Devuelve el contexto de autenticación
  return useContext(AuthContext);
};

export default useAuth;
