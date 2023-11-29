// ComponentesTab.js
import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import ComponentesTable from "./ComponentesTable";
import Popup from "../../../components/Popup";
import ComponentesAddForm from "./ComponentesAddForm";
import ComponentesEditForm from "./ComponentesEditForm";
import { defaultPalette } from "../../../config";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import * as ComponentesService from "../../../services/ComponentesService";

/* Styles */
const PageContent = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
}));

const ComponentesTab = () => {
  // Para informacion importante
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);

  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [record, setRecord] = useState(null); // componente a editar

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
    ComponentesService.getCategorias()
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        if (error !== null)
          console.error("Error al parsear categorías:", error);
      });
  }, []);

  // Recuperar los estados
  useEffect(() => {
    ComponentesService.getEstados()
      .then((data) => {
        setEstados(data);
      })
      .catch((error) => {
        if (error !== null) console.error("Error al parsear estados:", error);
      });
  }, []);

  return (
    <>
      <PageContent>
        <ComponentesTable
          categorias={categorias}
          estados={estados}
          setRecord={setRecord}
          setOpenAddPopup={setOpenAddPopup}
          setOpenEditPopup={setOpenEditPopup}
        />
      </PageContent>

      <Popup
        title="Agregar Componente"
        openPopup={openAddPopup}
        setOpenPopup={setOpenAddPopup}
        palette={palette}
      >
        <ComponentesAddForm options={{ categorias, estados }} />
      </Popup>

      <Popup
        title={`${
          record && record.activoBodega !== null ? `${record.activoBodega}` : ""
        }`}
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
        palette={palette}
      >
        <ComponentesEditForm
          record={record}
          options={{ categorias, estados }}
        />
      </Popup>
    </>
  );
};

export default ComponentesTab;
