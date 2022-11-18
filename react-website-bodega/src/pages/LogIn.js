import React from 'react';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '../components/Button/Button';

export default function LogIn() {
  return (
    <>
    <h1 className='log-in'>INICIAR SESIÓN</h1>
    <div style={{textAlign: 'center', paddingTop: '50px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = 'Ingresar'
        />
    </div>
    <div style={{marginTop: '50px', marginBottom: '50px', marginRight:'35%', marginLeft: '35%', textAlign:'center'}}>
      <Box
        component="form"
        sx={{
          backgroundColor: 'lightblue',
          border: 1,
          borderRadius: 10,
          maxWidth: '100%',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{marginBottom: '10px', marginTop:'10px'}}>
          <TextField
            
            required
            id="mail_login"
            label="Correo"
            defaultValue=""
          />
        </div>
        <div style={{marginBottom: "25px"}}>
          <TextField
            required
            id="pass_login"
            label="Contraseña"
            defaultValue=""
          />
        </div>
        <Button 
          className='btns'
          buttonStyle= 'btn--secundary'
          buttonSize = 'btn--large'
          >
            Ingresar
        </Button>  
      </Box>
    </div>
    <div style={{textAlign: 'center', paddingTop: '50px', marginLeft: "20%", marginRight: "20%", marginBottom: "150px"}}>
        <Text
          text_style = 'text_title'
          text = '¿No tienes cuenta?'
        />
        <a href='/create-acc'>
            <Button 
            className='btns'
            buttonStyle= 'btn--secundary'
            buttonSize = 'btn--large'
            >
            Crear Cuenta
            </Button>  
        </a> 
    </div>
    
    <Footer/>
    </>
  );
}
