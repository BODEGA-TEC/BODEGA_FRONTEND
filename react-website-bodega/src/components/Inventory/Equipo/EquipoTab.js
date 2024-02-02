// EquipoTab.js
import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import EquipoTable from "./EquipoTable";
import Popup from "../../../components/Popup";
import EquipoAddForm from "./EquipoAddForm";
import EquipoEditForm from "./EquipoEditForm";
import { defaultPalette } from "../../../config";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import * as EquipoService from "../../../services/EquipoService";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

/* Styles */
const PageContent = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
}));

const EquipoTab = () => {
  const axiosPrivate = useAxiosPrivate();

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
    EquipoService.getCategorias(axiosPrivate)
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
    EquipoService.getEstados(axiosPrivate)
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
        <EquipoTable
          categorias={categorias}
          estados={estados}
          setRecord={setRecord}
          setOpenAddPopup={setOpenAddPopup}
          setOpenEditPopup={setOpenEditPopup}
        />
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
        title={`${
          record && record.activoBodega !== null ? `${record.activoBodega}` : ""
        }`}
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
