import React from 'react';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '../components/Button/Button';

export default function CreateAcc() {
  return (
    <>
    <h1 className='create-acc'>CREAR CUENTA</h1>
    <div style={{textAlign: 'center', paddingTop: '50px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px"}}>
        <Text
          text_style = 'text_title'
          text = 'Nueva cuenta'
        />
    </div>
    <div style={{marginTop: '50px', marginBottom: '150px', marginRight:'35%', marginLeft: '35%', textAlign:'center'}}>
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
        <div style={{marginBottom: '10px', marginTop:'20px'}}>
          <TextField
            
            required
            id="mail_login"
            label="Correo"
            defaultValue=""
          />
        </div>
        <div style={{marginBottom: '10px', marginTop:'10px'}}>
          <TextField
            
            required
            id="mail_login"
            label="Confirmar correo"
            defaultValue=""
          />
        </div>
        <div style={{marginBottom: '10px', marginTop:'10px'}}>
          <TextField
            required
            id="pass_login"
            label="Contraseña"
            defaultValue=""
          />
        </div>
        <div style={{marginBottom: '10px', marginTop:'10px'}}>
          <TextField
            required
            id="pass_login"
            label="Confirmar contraseña"
            defaultValue=""
          />
        </div>
        <Button 
          className='btns'
          buttonStyle= 'btn--secundary'
          buttonSize = 'btn--large'
          >
            Crear
        </Button>  
      </Box>
    </div>
    <Footer/>
    </>
  );
}

