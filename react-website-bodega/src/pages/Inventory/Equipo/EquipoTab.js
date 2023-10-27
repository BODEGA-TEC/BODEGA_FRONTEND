// EquipoTab.js
import React, { useState, useEffect } from "react";
import { Grid, Paper, Toolbar } from "@mui/material";
import PopupButton from "../../../components/PopupButton";
import SearchBar from "../../../components/SearchBar";
import EquipoDataGrid from "./EquipoDataGrid";
import { Add as AddIcon } from "@mui/icons-material";
import Popup from "../../../components/Popup";
import EquipoAddForm from "./EquipoAddForm";
import EquipoEditForm from "./EquipoEditForm";
import { defaultPalette } from "../../../config";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import * as EquipoService from "../../../services/EquipoService";
// import Controls from "../../../components/controls/Controls";

/* Styles */
const PageContent = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
}));

const EquipoTab = () => {
  // Para informacion importante
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);

  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [record, setRecord] = useState(null); // equipo a editar

  // Obtener color
  const theme = useTheme();
  const color =
    "primary" === defaultPalette
      ? theme.palette.primary
      : theme.palette.secondary;

  const palette = {
    textcolor: color.contrastText,
    start: color.main,
    end: color.dark,
  };

  // Funcion para buscar un equipo
  const handleSearchBar = (e) => {
    console.log("buscar");
    //const target = e.target;
    // ...
  };

  // Recuperar las categorías
  useEffect(() => {
    EquipoService.getCategoriasEquipo()
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Error al parsear categorías:", error);
      });
  }, []);

  // Recuperar los estados
  useEffect(() => {
    EquipoService.getEstados()
      .then((data) => {
        setEstados(data);
      })
      .catch((error) => {
        console.error("Error al parsear estados:", error);
      });
  }, []);

  return (
    <>
      <PageContent>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={9}>
              <SearchBar
                label="Buscar Equipo"
                placeholder="Ingresar # activo bodega"
                handleSearch={handleSearchBar}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <PopupButton
                text="Agregar"
                setOpenPopup={setOpenAddPopup}
                icon={<AddIcon />}
              />
            </Grid>
          </Grid>
        </Toolbar>
        <EquipoDataGrid setRecord={setRecord} setOpenPopup={setOpenEditPopup} />
      </PageContent>

      <Popup
        title="Agregar Equipo"
        openPopup={openAddPopup}
        setOpenPopup={setOpenAddPopup}
        palette={palette}
      >
        <EquipoAddForm options={{ categorias, estados }} />
      </Popup>

      <Popup
        title="Detalles"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
        palette={palette}
      >
        <EquipoEditForm record={record} options={{ categorias, estados }} />
      </Popup>
    </>
  );
};

export default EquipoTab;
