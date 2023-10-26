// EquipoTab.js
import React, { useState } from "react";
import { Grid, Paper, Toolbar } from "@mui/material";
import PopupButton from "../../../components/PopupButton";
import SearchBar from "../../../components/SearchBar";
import EquipoDataGrid from "./EquipoDataGrid";
import { Add as AddIcon } from "@mui/icons-material";
import Popup from "../../../components/Popup";
import EquipoAddForm from "./EquipoAddForm";
import EquipoEditForm from "./EquipoEditForm";
import Controls from "../../../components/controls/Controls";
import { defaultPalette } from "../../../config";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

/* Styles */
const PageContent = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
}));

const EquipoTab = () => {
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [record, setRecord] = useState(null); // equipo a editar

  // Obtener color
  const theme = useTheme();
  const color =
    "primary" === defaultPalette
      ? theme.palette.primary
      : theme.palette.secondary;

  // Funcion para buscar un equipo
  const handleSearchBar = (e) => {
    const target = e.target;
    // ...
  };

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
              <SearchBar label="Buscar Equipo" handleSearch={handleSearchBar} />
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
        textcolor={color.contrastText}
        gradientcolor1={color.dark}
        gradientcolor2={color.main}
      >
        <EquipoAddForm />
      </Popup>

      <Popup
        title="Detalles"
        width="md"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <EquipoEditForm
          record={record}
          setRecord={setRecord}
          setOpenPopup={setOpenEditPopup}
        />
      </Popup>
    </>
  );
};

export default EquipoTab;
