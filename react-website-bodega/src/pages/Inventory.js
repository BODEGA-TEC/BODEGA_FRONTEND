import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "../components/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material/";
import EquipoTab from "./Inventory/Equipo/EquipoTab";
import ComponentesTab from "./Inventory/Componentes/ComponentesTab";
import Footer from "../components/Footer/Footer";
import { defaultPalette } from "../config";

/* Pagina del inventario */
const Inventory = (props) => {
  const { tab, setTab } = props;

  // Gestionar cambio tab
  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

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
              onChange={handleTabChange}
              textColor={defaultPalette}
              indicatorColor={defaultPalette}
              aria-label="basic tabs"
            >
              <Tab
                component={Link}
                to="/inventario/equipo"
                label="Equipo"
                {...a11yProps(0)}
              />
              <Tab
                component={Link}
                to="/inventario/componentes"
                label="Componentes"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={tab} index={0}>
            <EquipoTab />
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <ComponentesTab />
          </TabPanel>
        </Box>
      </Grid>
      <div style={{position: 'fixed', bottom: '0', width: '100%'}}>
      <Footer/>
      </div>
    </>
  );
};

export default Inventory;
