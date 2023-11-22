import { useRef, useState, useEffect } from "react";
import LogInBox from "../components/NavBar/LogInBox";
import Popup from "../components/Popup";
import { useTheme } from "@mui/material/styles";
import { defaultPalette } from "../config";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

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

  const navigate = useNavigate();
  const navigateToLogIn = () => {
    navigate("/");
  };

  const goBack = () =>{
    navigateToLogIn();
  };

  return (
    <>
    
    <Popup
          title="Iniciar Sesión"
          openPopup={true}
          setOpenPopup={goBack}
          palette={palette}
        >
          <LogInBox/>
        </Popup>
    </>
  );
};

export default Login;
