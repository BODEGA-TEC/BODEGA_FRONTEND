import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Alert from "@mui/material/Alert";
import EquipoDataGrid from "./Inventory/EquipoDataGrid";
import EquipoAddForm from "./Inventory/EquipoAddForm";
import Popup from "../components/Popup";
import { TabPanel, a11yProps } from "../components/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, Paper, Toolbar, InputAdornment, colors } from "@mui/material/";
import Controls from "../components/controls/Controls";
import { Search, Add as AddIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { theme as configTheme } from "../config";

/* Styles */
const PageContent = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
}));

/* Pagina del inventario */
const Inventory = (props) => {
  const { tab: startTab } = props;
  const [tab, setTab] = useState(startTab);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null); // equipo a editar

  // Obtener color
  const theme = useTheme();
  const color =
    "primary" === configTheme ? theme.palette.primary : theme.palette.secondary;

  // Gestionar cambio tab
  const handleChange = (_, newTab) => {
    setTab(newTab);
  };

  // Funcion para buscar un equipo
  const handleSearch = (e) => {
    const target = e.target;
    // ...
  };

  // Componentes de entrada
  const SearchItem = ({ handleSearch, tab }) => {
    const label = tab === 0 ? "Buscar Equipo" : "Buscar Componente";
    return (
      <Controls.Input
        label={label}
        style={{ width: "100%" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
      />
    );
  };

  const EquipoAddFormButton = ({ setOpenAddPopup }) => {
    return (
      <Controls.Button
        text="Agregar"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => {
          setOpenAddPopup(true);
        }}
      />
    );
  };

  // Componentes de pagina
  const EquipoTab = ({
    handleSearch,
    setOpenAddPopup,
    setOpenEditPopup,
    setRecordForEdit,
  }) => {
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
                <SearchItem handleSearch={handleSearch} tab={tab} />
              </Grid>
              <Grid item xs={12} md={3}>
                <EquipoAddFormButton setOpenAddPopup={setOpenAddPopup} />
              </Grid>
            </Grid>
          </Toolbar>
          <EquipoDataGrid />
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
      </>
    );
  };

  const ComponentesTab = () => {
    return <div>Item Two</div>;
  };

  // Luego, usa estos componentes en tus TabPanels
  return (
    <>
      <Grid
        container
        style={{ maxWidth: "90%", margin: "2% auto", textAlign: "center" }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            {/* https://mui.com/material-ui/react-tabs/ */}
            <Tabs
              value={tab}
              onChange={handleChange}
              //aria-label="basic tabs example"
            >
              <Tab label="equipo" {...a11yProps(0)} />
              <Tab label="componentes" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={tab} index={0}>
            <EquipoTab
              handleSearch={handleSearch}
              setOpenAddPopup={setOpenAddPopup}
              setOpenEditPopup={setOpenEditPopup}
              setRecordForEdit={setRecordForEdit}
            />
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <ComponentesTab />
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
};

export default Inventory;
