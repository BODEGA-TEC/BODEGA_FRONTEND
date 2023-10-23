import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useCallback } from 'react';
import { CustomTabPanel, a11yProps } from "../components/Tabs/CustomTabs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {GridActionsCellItem} from '@mui/x-data-grid';

const Inventory = () => {
  const [rows, setRowsValues] = useState([]);
  const columns = [
    {field: 'num_activo', headerName: '# Activo', width: 80 },
    {field: 'num_Tec',headerName: '# Activo Tec', width: 100,},
    {field: 'serie', headerName: '# Serie', width: 100 },
    {field: 'categoria',headerName: 'Categoría', width: 170,},
    {field: 'marca',headerName: 'Marca', width: 100,},
    {field: 'model',headerName: 'Modelo', width: 100,},
    {field: 'descrip',headerName: 'Descripción', width: 200,},
    {field: 'estado',headerName: 'Estado', width: 150,},
    {field: 'observa',headerName: 'Observaciones', width: 250,},
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 50,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        //const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            //onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
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

  const [value, setValue] = useState(0);
  const [categoria, setCategoria] = useState([]);
  const [estado, setEstado] = useState([]);
  const [nuevoActivo, setNuevoActivo] = useState({
    categoriaId: "",
    estadoId: "",
    descripcion: "",
    activoBodega: "",
    marca: "",
    modelo: "",
    activoTec: "",
    serie: "",
    observaciones: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Realizar la solicitud GET para obtener las categorías
    fetch("http://localhost:5145/api/categorias/equipo")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado de la categoría con los datos obtenidos
        const categoriasData = data.data.map((categoria) => ({
          value: categoria.id.toString(),
          label: categoria.nombre,
        }));
        setCategoria(categoriasData);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });

    // Realizar la solicitud GET para obtener los estados
    fetch("http://localhost:5145/api/estados")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado de los estados con los datos obtenidos
        const estadosData = data.data.map((estado) => ({
          value: estado.id.toString(),
          label: estado.nombre,
        }));
        setEstado(estadosData);
      })
      .catch((error) => {
        console.error("Error al obtener estados:", error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const agregarNuevoActivo = () => {
    // Realiza la solicitud POST utilizando el objeto nuevoActivo
    fetch("http://localhost:5145/api/equipo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoActivo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Si la solicitud fue exitosa, muestra la alerta de éxito
          setAlertMessage("Activo añadido correctamente");
          setAlertVisible(true);
          // Limpia los campos después de agregar
          setNuevoActivo({
            categoriaId: "",
            estadoId: "",
            descripcion: "",
            activoBodega: "",
            marca: "",
            modelo: "",
            activoTec: "",
            serie: "",
            observaciones: "",
          });
  
          // Recarga la página después de un breve retraso (puedes ajustar el valor de tiempo en milisegundos)
          setTimeout(() => {
            window.location.reload();
          }, 1000); // Ejemplo: recarga la página después de 1 segundo
        } else {
          // Si hubo un error en el servidor, muestra la alerta de error
          setAlertMessage("Error al agregar el activo");
          setAlertVisible(true);
        }
      })
      .catch((error) => {
        console.error("Error al agregar el activo:", error);
      });
  };
  

  return (
    <>
      <div style={{ marginLeft: '2%', marginTop: '10px' }}>
        <Text text="Inventario de equipo" text_style="text_title"/>
      </div>
      <div style={{ marginLeft: '2%', marginRight: '2%', maxWidth: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          style={{ fontSize: '12px' }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>

      <div style={{ marginLeft: "2%", marginRight: "2%"  }}>
        <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Text text="Agregar equipo" text_style="text_title"/>
          </Box>
          <CustomTabPanel value={value} index={0}>  
            <div
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <TextField
                id="no_activo_bodega_new"
                style={{ marginRight: "2%"}}
                label="No. Activo Bodega"
                fullWidth
                value={nuevoActivo.activoBodega}
                variant="outlined"
                onChange={(e) =>
                  setNuevoActivo({
                    ...nuevoActivo,
                    activoBodega: e.target.value,
                  })
                }
              />
              <TextField
                id="no_activo_tec_new"
                style={{ marginRight: "2%" }}
                label="No. Activo Tec"
                fullWidth
                value={nuevoActivo.activoTec}
                variant="outlined"
                onChange={(e) =>
                  setNuevoActivo({ ...nuevoActivo, activoTec: e.target.value })
                }
              />
              <TextField
                id="serie_new"
                label="Serie"
                fullWidth
                value={nuevoActivo.serie}
                variant="outlined"
                onChange={(e) =>
                  setNuevoActivo({ ...nuevoActivo, serie: e.target.value })
                }
              />
            </div>
            <div style={{ marginTop: "1%", width: "100%", display: "flex" }}>

              <TextField
                id="category_new"
                select
                fullWidth
                style={{ marginRight: "2%" }}
                label="Categoría"
                value={nuevoActivo.categoriaId}
                onChange={(e) =>
                  setNuevoActivo({
                    ...nuevoActivo,
                    categoriaId: e.target.value,
                  })
                }
              >
                {/* Cambiar esto por obtención de datos de la DB */}
                {categoria.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ marginRight: "2%"}}
                id="brand_new"
                fullWidth
                label="Marca"
                value={nuevoActivo.marca}
                variant="filled"
                onChange={(e) =>
                  setNuevoActivo({ ...nuevoActivo, marca: e.target.value })
                }
              />
              <TextField
                id="model_new"
                fullWidth
                label="Modelo"
                value={nuevoActivo.modelo}
                variant="filled"
                onChange={(e) =>
                  setNuevoActivo({ ...nuevoActivo, modelo: e.target.value })
                }
              />
            </div>
            <div style={{ marginTop: "1%", width: "100%", display: "flex" }}>
            <TextField
                required
                style={{ marginRight: "2%" }}
                id="descrip_new"
                fullWidth
                label="Descripción"
                value={nuevoActivo.descripcion}
                variant="filled"
                onChange={(e) =>
                  setNuevoActivo({
                    ...nuevoActivo,
                    descripcion: e.target.value,
                  })
                }
              />
              <TextField
                id="estatus_new"
                select
                fullWidth
                style={{ marginRight: "2%" }}
                label="Estado"
                value={nuevoActivo.estadoId}
                onChange={(e) =>
                  setNuevoActivo({ ...nuevoActivo, estadoId: e.target.value })
                }
              >
                {/* Cambiar esto por obtención de datos de la DB */}
                {estado.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="observations_new"
                fullWidth
                label="Observaciones"
                value={nuevoActivo.observaciones}
                multiline
                onChange={(e) =>
                  setNuevoActivo({
                    ...nuevoActivo,
                    observaciones: e.target.value,
                  })
                }
              />
            </div>
            <div style={{marginBottom: "2%"}}>
              {/* Agregar la alerta aquí */}
              {alertVisible && (
                <Alert
                  severity={
                    alertMessage.includes("correctamente") ? "success" : "error"
                  }
                  onClose={() => setAlertVisible(false)}
                >
                  {alertMessage}
                </Alert>
              )}
              </div>
              <Button variant="contained" onClick={agregarNuevoActivo}>
                Añadir
              </Button>
            
          </CustomTabPanel>
        </Box>
      </div>
      
      <div style={{ marginBottom: '0%' }}>
        <Footer />
      </div>
    </>
  );
};

export default Inventory;
