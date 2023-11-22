import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Box, TextField, Button} from "@mui/material";
import Alert from '@mui/material/Alert';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../services/AuthService";
import Text from "../Text/Text";

const LogInBox = () =>{
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [alertUserVisible, setAlertUserVisible] = useState(false);
    const [alertUserMessage, setAlertUserMessage] = useState("");

    const [alertPasswordVisible, setAlertPasswordVisible] = useState(false);
    const [alertPasswordMessage, setAlertPasswordMessage] = useState("");
    
    
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const TFUserName = (event) =>{
        setUserName(event.target.value);
    }

    const TFPassword = (event) =>{
        setPassword(event.target.value);
    }
    
    const checkInfo = (event) =>{
        if(userName === "" || password === ""){
            if(userName === ""){
                setAlertUserMessage("Campo de nombre vacío.");
                setAlertUserVisible(true);
            }
            if(password === ""){
                setAlertPasswordMessage("Campo de contraseña vacía.");
                setAlertPasswordVisible(true);
            }
        }else{
            handleSubmit(event);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { user, roles, token } = await login({
            carne: userName,
            clave: password,
          });
    
          if (user) {
            setAuth({ user, roles, token });
            navigate(from, { replace: true });
            
          } else {
            setAlertPasswordMessage("Información incorrecta.");
            setAlertPasswordVisible(true);
          }
        } catch (err) {
          setAlertPasswordMessage(err);
          setAlertPasswordVisible(true);
        }
      };

    return(
        <>
        <div style={{marginTop: '5%'}}>
            <Box
            sx ={{
                width: '300px'
            }}
            >   
                <div style={{textAlign: 'center'}}>
                    <div>
                    <Text
                        text_style = 'text_title'
                        text = 'Nombre de usuario:'
                    />
                    </div>
                    <div style={{marginTop:'5%', marginBottom: '15%'}}>
                        <TextField
                            required
                            id="filled-required"
                            label="Requerido"
                            defaultValue={userName}
                            onChange={(event)=>{TFUserName(event)}}
                            variant="filled"
                        />
                    </div>
                    <div>
                    {alertUserVisible && (
                            <Alert
                            severity="error"
                            onClose={() => setAlertUserVisible(false)}
                            >
                            {alertUserMessage}
                            </Alert>
                        )}
                    </div>
                    <div>
                    <Text
                        text_style = 'text_title'
                        text = 'Contraseña:'
                    />
                    </div>
                    <div style={{marginTop:'5%', marginBottom: '10%'}}>
                        <TextField
                            id="outlined-password-input"
                            label="Contraseña"
                            defaultValue={password}
                            type="password"
                            autoComplete=""
                            onChange={TFPassword}
                        />
                    </div>
                    <div>
                    {alertPasswordVisible && (
                            <Alert
                            severity="error"
                            onClose={() => setAlertPasswordVisible(false)}
                            >
                            {alertPasswordMessage}
                            </Alert>
                        )}
                    </div>
                    <div style={{marginBottom: '15%', marginTop: '10%'}}>
                    <Button variant="contained" onClick={(event)=>{checkInfo(event)}}>Ingresar</Button>
                    </div>
                </div>
            </Box>
        </div>
        </>
    );
}

export default LogInBox;