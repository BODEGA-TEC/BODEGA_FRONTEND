import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import {DataGrid} from '@mui/x-data-grid'
import { Button } from '@mui/material';
import data from './exampleJson.json'
import { useState } from 'react';
const Inventory = () => {
    
    const [rows, setRowsValues] = useState([]);
    {/*Definición de la estructura de las columnas en el Data Grid */}
    const columns = [
        {field: 'id',headerName: 'ID', width: 150,},
        {field: 'descrip',headerName: 'Descripción', width: 150,},
        {field: 'categoria',headerName: 'Categoría', width: 150,},
        {field: 'marca',headerName: 'Marca', width: 150,},
        {field: 'model',headerName: 'Modelo', width: 150,},
        { field: 'serie', headerName: 'Serie', width: 130 },
        {field: 'estado',headerName: 'Estado', width: 150,},
        { field: 'num_activo', headerName: 'No. Activo', width: 130 },
        {field: 'num_Tec',headerName: 'No. Activo Tec', width: 150,},
        {field: 'observa',headerName: 'Observaciones', width: 160,},
      ];

    function createData(id, categoria, estado, descrip, num_activo, marca, model, num_Tec, serie, observa) {
        return {id, categoria, estado, descrip, num_activo, marca, model, num_Tec, serie, observa};
      }
      
    
    {/*Cuando el botón "Actualizar" es clickeado, se recaban todos los datos */}
    const handleUpdateTable = (event) =>{
        let rowsAux = []
        {/*Acá se ha de ingresar la función para recoger los objetos JSON de la
        base de datos*/}
        if (data.success === true){
            data.data.forEach(
                (device) =>{
                    rowsAux = Object.assign([], rowsAux);
                    rowsAux.push(
                        createData(device.id, device.categoria.nombre, device.estado.descripcion, device.descripcion ,device.activoBodega, 
                            device.marca, device.modelo, device.activoTec, device.serie, device.observaciones)
                        );
                }
            );
            setRowsValues(rowsAux)
        }
           
    }

    return(
        <>
            <div style={{marginLeft: '5%', marginTop: '50px'}}>
            <Text text= "Buscar en inventario" text_style="text_title"/>
            </div>
            {/*Data grid. Esencialmente, una tabla especializada.*/}
            <div style={{ marginLeft: '5%' , maxWidth: '90%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
            <div style={{marginBottom: '100px', marginTop: '20px', marginLeft: '5%'}}>
            <Button variant="contained" onClick={handleUpdateTable}>Actualizar</Button>
            </div>
        <div style={{marginBottom: '0%'}}>               
        <Footer/>
        </div>
        </>
    );
}

export default Inventory;