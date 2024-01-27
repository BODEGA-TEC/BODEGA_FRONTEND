import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "../components/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material/";
import NotReturnedTab from "../components/NotReturned/NotReturnedTab";
import { defaultPalette } from "../config";

/* Pagina de quienes no han devuelto boletas */
const Returned = () => {
  return (
    <>
      <Grid
        container
        style={{ maxWidth: "90%", margin: "2% auto", textAlign: "center" }}
      >
        <Box sx={{ width: "100%" }}>
          <TabPanel>
            <NotReturnedTab />
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
};

export default Returned;
