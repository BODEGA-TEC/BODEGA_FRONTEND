import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useCallback } from 'react';

const Inventory = () => {
  const [rows, setRowsValues] = useState([]);
  const columns = [
    {field: 'id',headerName: 'ID', width: 80,},
    {field: 'descrip',headerName: 'Descripción', width: 150,},
    {field: 'categoria',headerName: 'Categoría', width: 150,},
    {field: 'marca',headerName: 'Marca', width: 100,},
    {field: 'model',headerName: 'Modelo', width: 100,},
    { field: 'serie', headerName: 'Serie', width: 130 },
    {field: 'estado',headerName: 'Estado', width: 150,},
    { field: 'num_activo', headerName: 'No. Activo', width: 130 },
    {field: 'num_Tec',headerName: 'No. Activo Tec', width: 150,},
    {field: 'observa',headerName: 'Observaciones', width: 160,},
  ];

  function createData(id, categoria, estado, descrip, num_activo, marca, model, num_Tec, serie, observa) {
    return { id, categoria, estado, descrip, num_activo, marca, model, num_Tec, serie, observa };
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5145/api/equipo');
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      if (data.success === true) {
        const rowsAux = data.data.map((device) =>
          createData(
            device.id,
            device.categoria.nombre,
            device.estado.nombre,
            device.descripcion,
            device.activoBodega,
            device.marca,
            device.modelo,
            device.activoTec,
            device.serie,
            device.observaciones
          )
        );
        setRowsValues(rowsAux);
      }
    } catch (error) {
      console.error(error);
      // Manejar errores aquí si es necesario
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div style={{ marginLeft: '2%', marginTop: '10px' }}>
        <Text text="Inventario" text_style="text_title" />
      </div>
      <div style={{ marginLeft: '2%', marginRight: '2%', maxWidth: '100%', marginBottom: '10%' }}>
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
      
      <div style={{ marginBottom: '0%' }}>
        <Footer />
      </div>
    </>
  );
};

export default Inventory;
