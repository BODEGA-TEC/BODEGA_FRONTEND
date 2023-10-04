import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import * as React from 'react';
import { CustomTabPanel, a11yProps } from '../components/Tabs/CustomTabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const EditInventory = () =>{
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    {/* Cambiar esto por obtención de datos de la DB */}
    const categoria = [
        {
          value: '0000',
          label: 'Osciloscopio',
        },
        {
          value: '0001',
          label: 'Multimetro',
        },
        {
          value: '0002',
          label: 'Elvis',
        },
        {
          value: '0003',
          label: 'Fuente',
        },
      ];

    const estado = [
        {
            value:'0000',
            label: 'En Bodega'
        },
        {
            value: '0001',
            label: 'Prestado'
        },{
            value: '0002',
            label: 'Malo'
        },{
            value: '0003',
            label: 'Reparandose'
        }
    ]

    return (
        <>
            <div style={{ marginLeft: '5%', marginTop: '50px' }}>
                <Text text="Actualizar Inventario" text_style="text_title" />
            </div>
            <div style={{marginLeft: '5%'}}>
                <Box sx={{ width: '90%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Ingresar Activo" {...a11yProps(0)} />
                        <Tab label="Eliminar Activo" {...a11yProps(1)} />
                        <Tab label="Actualizar Activo" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        Información de los códigos de activo a ingresar:
                        
                        <div style={{marginTop:'2%', width: '70%', display:'flex', marginBottom: '2%'}}>
                            <TextField
                                required
                                id="no_activo_new"
                                style={{marginRight: '5%'}}
                                label="No. Activo Electro"
                                defaultValue=""
                                variant="outlined"
                            />
                                <TextField
                                id="no_activo_tec_new"
                                style={{marginRight: '5%'}}
                                label="No. Activo Tec"
                                defaultValue=""
                                variant="outlined"
                            />
                            <TextField
                                id="serie_new"
                                style={{marginRight: '5%'}}
                                label="Serie"
                                defaultValue=""
                                variant="outlined"
                            />
                        </div>
                        Destalles del activo a ingresar:
                        <div style={{marginTop: '2%', width:'60%', display: 'flex'}}>
                            <TextField
                                required
                                style={{marginRight: '5%'}}
                                id="descrip_new"
                                fullWidth
                                label="Descripción"
                                defaultValue=""
                                variant="filled"
                            />
                            <TextField
                                id="category_new"
                                select
                                fullWidth
                                style={{maxWidth:'30%'}}
                                label="Categoría"
                                defaultValue=""
                                helperText="Seleccione una categoría"
                                >
                            {/* Cambiar esto por obtención de datos de la DB */}
                                {categoria.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div style={{marginTop: '2%', width:'60%', display: 'flex', marginBottom: '2%'}}>
                            <TextField
                                style={{marginRight: '5%'}}
                                id="brand_new"
                                fullWidth
                                label="Marca"
                                defaultValue=""
                                variant="filled"
                            />
                            <TextField
                                style={{marginRight: '5%'}}
                                id="model_new"
                                fullWidth
                                label="Modelo"
                                defaultValue=""
                                variant="filled"
                            />
                        </div>
                        Otros detalles del dispositivo:
                        <div style={{marginTop: '2%', width:'60%', display: 'flex'}}>
                            <TextField
                                style={{marginRight: '5%'}}
                                id="model_new"
                                fullWidth
                                label="Observaciones"
                                defaultValue=""
                                multiline
                            />
                            <TextField
                                id="estatus_new"
                                select
                                fullWidth
                                style={{maxWidth:'30%'}}
                                label="Estado"
                                defaultValue=""
                                helperText="Seleccione un estado"
                                >
                            {/* Cambiar esto por obtención de datos de la DB */}
                                {estado.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div style={{marginBottom: '5%'}}>
                            <Button variant="contained">Añadir</Button>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </div>
            <div style={{ marginBottom: '0%' }}>
                <Footer />
            </div>
        </>
        
    );
}

export default EditInventory;