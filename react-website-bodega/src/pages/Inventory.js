import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "../components/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, Paper } from "@mui/material/";
import EquipoTab from "./Inventory/Equipo/EquipoTab";

/* Pagina del inventario */
const Inventory = (props) => {
  const { tab: startTab } = props;
  const [tab, setTab] = useState(startTab);

  const ComponentesTab = () => {
    return <div>Item Two</div>;
  };

  // Gestionar cambio tab
  const handleTabChange = (_, newTab) => {
    setTab(newTab);
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
              //aria-label="basic tabs example"
            >
              <Tab label="equipo" {...a11yProps(0)} />
              <Tab label="componentes" {...a11yProps(1)} />
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
    </>
  );
};

export default Inventory;