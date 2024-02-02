import { createContext, useState } from "react";

// Crea el contexto de autenticación
export const AuthContext = createContext({});

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  // Estado local para almacenar la información de autenticación
  const [auth, setAuth] = useState({});

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (targetRole) => {
    return auth?.rol === targetRole;
  };

  // Función para verificar si el usuario está autenticado
  const isLoggedIn = () => {
    return !!auth?.nombre;
  };

  // Renderiza el proveedor de autenticación con el valor del contexto
  return (
    <AuthContext.Provider value={{ auth, setAuth, hasRole, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
