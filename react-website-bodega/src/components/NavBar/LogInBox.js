import React, { useState, useEffect } from "react";
import { Box, TextField, Button} from "@mui/material";
import Alert from '@mui/material/Alert';

const LogInBox = () =>{
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [alertUserVisible, setAlertUserVisible] = useState(false);
    const [alertUserMessage, setAlertUserMessage] = useState("");

    const [alertPasswordVisible, setAlertPasswordVisible] = useState(false);
    const [alertPasswordMessage, setAlertPasswordMessage] = useState("");
    

    const TFUserName = (event) =>{
        setUserName(event.target.value);
    }

    const TFPassword = (event) =>{
        setPassword(event.target.value);
    }
    
    const checkInfo = () =>{
        if(userName === "" || password === ""){
            if(userName === ""){
                setAlertUserMessage("Campo de nombre vacío.");
                setAlertUserVisible(true);
            }
            if(password === ""){
                setAlertPasswordMessage("Campo de contraseña vacía.");
                setAlertPasswordVisible(true);
            }
        }
    }

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
                    Ingresar nombre de usuario:
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
                    Ingresar contraseña:
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
                    <div style={{marginBottom: '15%'}}>
                    <Button variant="contained" onClick={checkInfo}>Ingresar</Button>
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
                </div>
            </Box>
        </div>
        </>
    );
}

export default LogInBox;