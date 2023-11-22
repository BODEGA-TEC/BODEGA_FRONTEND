import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const hasRole = (targetRole) => {
    return auth?.roles && auth?.roles.includes(targetRole);
  };

  const isLoggedIn = () => {
    return !!auth?.user;
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, hasRole, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
