import { useRef, useState, useEffect } from "react";
import LogInBox from "../components/NavBar/LogInBox";
import Popup from "../components/Popup";
import { useTheme } from "@mui/material/styles";
import { defaultPalette } from "../config";
const Login = () => {
  const [openLogInPopup, setOpenLogInPopup] = useState(true);

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
  return (
    <>
    
    <Popup
          title="Iniciar Sesión"
          openPopup={true}
          setOpenPopup={openLogIn}
          palette={palette}
        >
          <LogInBox/>
        </Popup>
    </>
  );
};

export default Login;
