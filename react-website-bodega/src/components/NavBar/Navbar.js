import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Controls from "../controls/Controls";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();

  const navigateToLogIn = () => {
    navigate("/");
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
            Bodega Web{" "}
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
                <button className="dropbtn">Inventario</button>
                <div className="dropdown-content">
                  <Link
                    to={"/inventario"}
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Equipo
                  </Link>
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    Componentes
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                to="/"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
          {button && (
            <Controls.Button
              text="Iniciar sesión"
              variant="outlined"
              color="primary"
              onClick={navigateToLogIn}
            />
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
