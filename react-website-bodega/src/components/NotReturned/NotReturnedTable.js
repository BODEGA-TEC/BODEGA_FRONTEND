import React, { useState, useEffect, useMemo } from "react";
import PopupButton from "../PopupButton";
import { defaultPalette } from "../../config";
import { generateBarcode } from "../../utils/functions";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField as MRTGlobalFilterTextField,
  MRT_ToggleFiltersButton as MRTToggleFiltersButton,
  MRT_ShowHideColumnsButton as MRTShowHideColumnsButton,
  MRT_ToggleDensePaddingButton as MRTToggleDensePaddingButton,
  MRT_ToggleFullScreenButton as MRTToggleFullScreenButton,
} from "material-react-table";

//Material UI Imports
import { Box, ListItemIcon, MenuItem, lighten } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Delete, Download } from "@mui/icons-material";

const NotReturned = (

) => {
  const [records, setRecords] = useState([]);

  const { hasRole, isLoggedIn } = useAuth();

  const columns = useMemo(
    () => [
      isLoggedIn() && {
        accessorKey: "id",
        header: "ID",
        size: 100,
        enableResizing: false,
        enableGrouping: false,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "consecutivo",
        header: "CONSECUTIVO",
        size: 150,
        enableResizing: false,
        enableGrouping: false,
      },
      {
        accessorKey: "nombreSolicitante",
        header: "NOMBRE",
        minSize: 100,
        size: 150,
        enableGrouping: false,
      },
      {
        accessorKey: "tipoSolicitante",
        header: "SOLICITANTE",
        minSize: 100,
        size: 150,
      },
      {
        accessorKey: "correoSolicitante",
        header: "CORREO ELECTRÓNICO",
        minSize: 200,
        size: 300,
      },
      {
        accessorKey: "carneSolicitante",
        header: "CARNE",
        minSize: 150,
        size: 200,
      },
    ].filter(Boolean),
    [isLoggedIn]
  );

  const fetchData = async () => {
    try {
      // const response = await getBoletasNotReturned();
      // setRecords(response);
      console.log("fetchData");
    } catch (error) {
      if (error !== null) console.error("Error al recuperar boletas:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: records,
    loading: false,
    initialSortBy: [
      {
        id: "consecutivo",
        desc: true,
      },
    ],
    initialState: {
      hiddenColumns: ["id"],
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MaterialReactTable table={table} />
    </div>
  );
};


export default NotReturned;