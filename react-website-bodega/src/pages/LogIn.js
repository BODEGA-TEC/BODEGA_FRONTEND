import React, { useState } from 'react';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '../components/Button/Button';

export default function LogIn() {
  const [token, setToken] = useState(''); // Estado para almacenar el token

  // Función para manejar el envío del formulario
  const handleLogin = async () => {
    const apiUrl = 'http://localhost:5145/api/login';
    const requestBody = {
      carne: '0000000001',
      clave: 'Asistente_1',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        
        const data = await response.json();
        const { data: tokenData } = data;



        // Guardar el token en el estado
        setToken(tokenData);

        // Redirigir o realizar acciones adicionales según lo necesites
      } else {
        // Manejar errores de autenticación aquí
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
      <h1 className='log-in'>INICIAR SESIÓN</h1>
      <div style={{ textAlign: 'center', paddingTop: '50px', marginLeft: "20%", marginRight: "20%", marginBottom: "50px" }}>
        <Text
          text_style='text_title'
          text='Ingresar'
        />
      </div>
      <div style={{ marginTop: '50px', marginBottom: '50px', marginRight: '35%', marginLeft: '35%', textAlign: 'center' }}>
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
          <div style={{ marginBottom: '10px', marginTop: '10px' }}>
            <TextField
              required
              id="mail_login"
              label="Correo"
              defaultValue=""
            />
          </div>
          <div style={{ marginBottom: "25px" }}>
            <TextField
              required
              id="pass_login"
              label="Contraseña"
              defaultValue=""
            />
          </div>
          <Button
            className='btns'
            buttonStyle='btn--secundary'
            buttonSize='btn--large'
            onClick={handleLogin} // Llama a la función al hacer clic en "Ingresar"
          >
            Ingresar
          </Button>
        </Box>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '50px', marginLeft: "20%", marginRight: "20%", marginBottom: "150px" }}>
        <Text
          text_style='text_title'
          text='¿No tienes cuenta?'
        />
        <a href='/create-acc'>
          <Button
            className='btns'
            buttonStyle='btn--secundary'
            buttonSize='btn--large'
          >
            Crear Cuenta
          </Button>
        </a>
      </div>
      <Footer />
    </>
  );
}
