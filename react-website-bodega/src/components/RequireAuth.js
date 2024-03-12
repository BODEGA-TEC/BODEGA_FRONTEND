import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Verificar si el usuario tiene un rol permitido
  const isRoleAllowed = allowedRoles?.includes(auth?.rol);

  // Si el usuario tiene un rol permitido, renderizar el contenido
  if (isRoleAllowed) {
    return <Outlet />;
  } else {
    // Si el usuario no tiene un rol permitido, redirigir según su estado de autenticación
    return auth?.id ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/services" state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;
