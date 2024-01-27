import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import NotReturnedTable from "./NotReturnedTable";
import Popup from "../../components/Popup";
import { defaultPalette } from "../../config";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
// import * as NotReturnedService from "../../services/NotReturnedService";

/* Styles */
const PageContent = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
}));

const NotReturnedTab = () => {
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

  // Recuperar las categorías
  useEffect(() => {
    // NotReturnedService.getCategorias()
    //   .then((data) => {
    //     setCategorias(data);
    //   })
    //   .catch((error) => {
    //     if (error !== null)
    //       console.error("Error al parsear categorías:", error);
    //   });
  }, []);

  // Recuperar los estados
  useEffect(() => {
    // NotReturnedService.getEstados()
    //   .then((data) => {
    //     setEstados(data);
    //   })
    //   .catch((error) => {
    //     if (error !== null) console.error("Error al parsear estados:", error);
    //   });
  }, []);

  return (
    <>
      <PageContent>
        <NotReturnedTable/>
      </PageContent>
    </>
  );
}

export default NotReturnedTab;