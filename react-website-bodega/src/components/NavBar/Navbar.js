import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button } from "../Button/Button";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();

  const navigateToLogIn = () => {
    navigate("/log-in");
  };

  // Funtion that displays the button in mobile screens
  // when its required.
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
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
            Bodega Web <img className="bodega-logo" src="/logo.png" alt="logo" />
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
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Servicios
              </Link>
            </li>

            <li className="nav-item">
              <div className="dropdown">
                <button className="dropbtn">Inventario</button>
                <div className="dropdown-content">
                  <Link
                    to={'/consultInventory'}
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Consultar
                  </Link>
                  <Link
                    to="/editInventory"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Actualizar
                  </Link>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div className="dropdown">
                <button className="dropbtn">Formularios</button>
                <div className="dropdown-content">
                  <Link
                    to={'/forms/estudiante'}
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Estudiante
                  </Link>
                  <Link
                    to="/forms/profesor"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Profesor
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                to="/log-in"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
          {button && (
            <Button buttonStyle="btn--outline" onClick={navigateToLogIn}>
              Iniciar sesión{" "}
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
