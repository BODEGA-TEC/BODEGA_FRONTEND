import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Controls from "../controls/Controls";
import Popup from "../Popup";
import { useTheme } from "@mui/material/styles";
import { defaultPalette } from "../../config";
import LogInBox from "./LogInBox";


function Navbar({ handleTabChange }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();

  const [openLogInPopup, setOpenLogInPopup] = useState(false);

  const navigateToLogIn = () => {
    navigate("/");
  };
  
  const theme = useTheme();

  const color =
    "primary" === defaultPalette
      ? theme.palette.primary
      : theme.palette.secondary;

  const palette = {
    textcolor: color.contrastText,
    start: color.main,
    end: color.dark,
  };

  const openLogIn = () =>{
    setOpenLogInPopup(true);
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
                <Controls.Button
                  className="dropbtn"
                  text="Inventario"
                  variant="outlined"
                  style={{ color: "#FFF", borderColor: "#FFF" }}
                  onClick={navigateToLogIn}
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
              style={{ color: "#FFF", borderColor: "#FFF" }}
              onClick={openLogIn}
            />
          )}
        </div>
        <Popup
          title="Iniciar Sesión"
          openPopup={openLogInPopup}
          setOpenPopup={setOpenLogInPopup}
          palette={palette}
        >
          <LogInBox/>
        </Popup>
      </nav>
    </>
  );
}

export default Navbar;
