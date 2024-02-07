import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Controls from "../controls/Controls";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";
import useLogout from "../../hooks/useLogout";

function Navbar({ handleTabChange }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const { hasRole, isLoggedIn } = useAuth();

  // Funtion that displays the button in mobile screens
  // when its required.
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  // Render Log In button once.
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            {" "}
            <img className="bodega-logo" src="/logo.png" alt="logo" />
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <div className="dropdown">
                <Controls.Button
                  className="dropbtn"
                  text="Inventario"
                  variant="outlined"
                  style={{ color: "#FFF", borderColor: "#FFF" }}
                />
                <div className="dropdown-content">
                  <Link
                    to={"/inventario/equipo"}
                    className="nav-links"
                    onClick={() => {
                      closeMobileMenu();
                      handleTabChange(null, 0);
                    }}
                  >
                    Equipo
                  </Link>
                  <Link
                    to={"/inventario/componentes"}
                    className="nav-links"
                    onClick={() => {
                      closeMobileMenu();
                      handleTabChange(null, 1);
                    }}
                  >
                    Componentes
                  </Link>
                </div>
              </div>
            </li>

            {/* Condición para mostrar el menú de Administrador solo si el usuario está logueado y es administrador */}
            {isLoggedIn() && hasRole(ROLES.ADMIN) && (
              <li className="nav-item">
                <div className="dropdown">
                  <Controls.Button
                    className="dropbtn"
                    text="Administrador"
                    variant="outlined"
                    style={{ color: "#FFF", borderColor: "#FFF" }}
                  />
                  <div className="dropdown-content">
                    <Link to={"../returned"} className="nav-links" onClick={closeMobileMenu}>
                      Reportes de Objetos No Devueltos
                    </Link>
                    <Link to={"../register"} className="nav-links" onClick={closeMobileMenu}>
                      Registrar Asistentes
                    </Link>
                    <Link to={"../maintenance"} className="nav-links" onClick={closeMobileMenu}>
                      Mantenimiento de la base de datos
                    </Link>
                  </div>
                </div>
              </li>
            )}

            {/* Condición para cerrar sesión solo si el usuario está logueado */}
            {isLoggedIn() && (
              <li className="nav-item">
                <Link className="nav-links" onClick={signOut}>
                  Cerrar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>

      </nav>
    </>
  );
}

export default Navbar;
