import "../App.css";
import Footer from "../components/Footer/Footer";
import Text from "../components/Text/Text";
import { CustomTabPanel, a11yProps } from "../components/Tabs/CustomTabs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

const EditInventory = () => {
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
          label: estado.descripcion,
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
      <div style={{ marginLeft: "5%", marginTop: "50px" }}>
        <Text text="Actualizar Inventario" text_style="text_title" />
      </div>
      <div style={{ marginLeft: "5%" }}>
        <Box sx={{ width: "90%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Ingresar Activo" {...a11yProps(0)} />
              <Tab label="Eliminar Activo" {...a11yProps(1)} />
              <Tab label="Actualizar Activo" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Información de los códigos de activo a ingresar:
            <div
              style={{
                marginTop: "2%",
                width: "70%",
                display: "flex",
                marginBottom: "2%",
              }}
            >
              <TextField
                id="no_activo_bodega_new"
                style={{ marginRight: "5%" }}
                label="No. Activo Bodega"
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
                style={{ marginRight: "5%" }}
                label="No. Activo Tec"
                value={nuevoActivo.activoTec}
                variant="outlined"
                onChange={(e) =>
                  setNuevoActivo({ ...nuevoActivo, activoTec: e.target.value })
                }
              />
              <TextField
                id="serie_new"
                style={{ marginRight: "5%" }}
                label="Serie"
                value={nuevoActivo.serie}
                variant="outlined"
                onChange={(e) =>
                  setNuevoActivo({ ...nuevoActivo, serie: e.target.value })
                }
              />
            </div>
            Destalles del activo a ingresar:
            <div style={{ marginTop: "2%", width: "60%", display: "flex" }}>
              <TextField
                required
                style={{ marginRight: "5%" }}
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
                id="category_new"
                select
                fullWidth
                style={{ maxWidth: "30%" }}
                label="Categoría"
                value={nuevoActivo.categoriaId}
                onChange={(e) =>
                  setNuevoActivo({
                    ...nuevoActivo,
                    categoriaId: e.target.value,
                  })
                }
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
            <div
              style={{
                marginTop: "2%",
                width: "60%",
                display: "flex",
                marginBottom: "2%",
              }}
            >
              <TextField
                style={{ marginRight: "5%" }}
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
                style={{ marginRight: "5%" }}
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
            Otros detalles del dispositivo:
            <div style={{ marginTop: "2%", width: "60%", display: "flex" }}>
              <TextField
                style={{ marginRight: "5%" }}
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
              <TextField
                id="estatus_new"
                select
                fullWidth
                style={{ maxWidth: "30%" }}
                label="Estado"
                value={nuevoActivo.estadoId}
                helperText="Seleccione un estado"
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
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </div>
      <div style={{ marginBottom: "0%" }}>
        <Footer />
      </div>
    </>
  );
};

export default EditInventory;
