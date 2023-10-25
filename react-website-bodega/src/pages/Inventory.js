import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import EquipoDataGrid from "./Inventory/EquipoDataGrid";
import { TabPanel, a11yProps } from "../components/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Inventory = (props) => {
  const { tab: startTab } = props;
  const [tab, setTab] = useState(startTab);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <div style={{ marginLeft: "5%", marginTop: "5%", marginRight: "5%" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            {/* https://mui.com/material-ui/react-tabs/ */}
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="equipo" {...a11yProps(0)} />
              <Tab label="componentes" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={tab} index={0}>
            <div
              style={{
                maxWidth: "90%",
                margin: "2% auto",
                textAlign: "center",
              }}
            >
              <EquipoDataGrid />
            </div>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Inventory;
