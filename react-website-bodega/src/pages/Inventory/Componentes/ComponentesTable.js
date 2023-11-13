import React, { useEffect, useState, useMemo } from "react";
import "../inventory.css";
import {
  getComponente,
  deleteComponente,
} from "../../../services/ComponentesService";
import PopupButton from "../../../components/PopupButton";
import { defaultPalette } from "../../../config";
import { generateBarcode } from "../../../utils/barcode"; // Asegúrate de importar la función correcta

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
import { Info, Delete, Download } from "@mui/icons-material";

const ComponenteTable = ({ setRecord, setOpenAddPopup, setOpenEditPopup }) => {
  const [records, setRecords] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "activoBodega",
        header: "ID",
        size: 100,
        enableResizing: false,
        enableGrouping: false,
        enableColumnOrdering: false,
      },
      // {
      //   accessorKey: "activoTec",
      //   header: "ACTIVO TEC",
      //   size: 195,
      //   enableResizing: false,
      //   enableGrouping: false,
      // },
      {
        accessorKey: "descripcion",
        header: "DESCRIPCIÓN",
        minSize: 300,
        size: 400,
        enableGrouping: false,
      },
      {
        accessorKey: "cantidad",
        header: "CANTIDAD",
        minSize: 170,
        size: 170,
        enableGrouping: false,
      },
      {
        accessorKey: "categoria",
        header: "CATEGORÍA",
        minSize: 195,
        size: 195,
      },
      {
        accessorKey: "estado",
        header: "ESTADO",
        size: 190,
        enableResizing: false,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={() => ({
              backgroundColor:
                cell.getValue() === "DISPONIBLE"
                  ? "#2196F3" // Azul
                  : cell.getValue() === "PRESTADO"
                  ? "#808080" // Gris
                  : cell.getValue() === "AGOTADO"
                  ? "#808080" // Gris
                  : cell.getValue() === "DAÑADO"
                  ? "#d32f2f" // Rojo
                  : cell.getValue() === "EN REPARACION"
                  ? "#ff8800" // Naranja
                  : cell.getValue() === "RETIRADO"
                  ? "#8B4513" // Café
                  : cell.getValue() === "APARTADO"
                  ? "#29b4dc" // Celeste
                  : "transparent", // Puedes agregar un color de fondo predeterminado si es necesario
              borderRadius: "0.25rem",
              color: "#fff",
              width: "19ch",
              p: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorKey: "modelo",
        header: "MODELO",
        minSize: 170,
        size: 170,
      },
      {
        accessorKey: "condicion",
        header: "CONDICIÓN",
        size: 186,
        enableResizing: false,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={() => ({
              backgroundColor:
                cell.getValue() === "BUENO"
                  ? "#388e3c" // Azul
                  : cell.getValue() === "DAÑADO"
                  ? "#d32f2f" // Rojo
                  : cell.getValue() === "REGULAR"
                  ? "#ffbf00" // Amarillo
                  : "transparent", // Puedes agregar un color de fondo predeterminado si es necesario
              borderRadius: "0.25rem",
              color: "#fff",
              width: "11ch",
              p: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorKey: "estante",
        header: "ESTANTE",
        minSize: 170,
        size: 170,
      },
      {
        accessorKey: "observaciones",
        header: "OBSERVACIONES",
        minSize: 240,
        size: 240,
        enableGrouping: false,
      },
      {
        accessorKey: "fecha",
        header: "CREADO",
        size: 170,
      },
    ],
    []
  );

  const fetchData = async () => {
    try {
      const data = await getComponente();
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditButton = (data) => {
    setRecord(data);
    setOpenEditPopup(true);
  };

  // Eliminar equipo
  const handleDeleteButton = (componenteId) => {
    // Llama a la función del servicio para eliminar un activo
    deleteComponente(componenteId)
      .then(() => {
        // Recarga la página después de un breve retraso
        setTimeout(() => {
          window.location.reload();
        }, 850);
      })
      .catch(() => {
        // Maneja el error si es necesario
      });
  };

  const handleBarcodeClick = (activoBodega) => {
    generateBarcode(activoBodega);
  };

  const table = useMaterialReactTable({
    columns,
    data: records,
    initialState: {
      columnVisibility: { serie: false, fecha: false },
      showGlobalFilter: true,
    },
    enableColumnResizing: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableGrouping: true,
    enableFacetedValues: true,
    enableStickyHeader: true,
    enableRowActions: true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "top",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: defaultPalette,
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },

    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          handleEditButton(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        Ver
      </MenuItem>,

      <MenuItem
        key={1}
        onClick={() => {
          handleDeleteButton(row.original.id);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Eliminar
      </MenuItem>,

      <MenuItem
        key={2}
        onClick={() => {
          handleBarcodeClick(row.original.activoBodega);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Download />
        </ListItemIcon>
        Descargar etiqueta
      </MenuItem>,
    ],

    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {/* Importar sub-componentes de MRT */}
            <MRTGlobalFilterTextField table={table} />
            <MRTToggleFiltersButton table={table} />
            <MRTShowHideColumnsButton table={table} />
            <MRTToggleDensePaddingButton table={table} />
            <MRTToggleFullScreenButton table={table} />
          </Box>
          <PopupButton
            sx={{ display: "flex" }}
            text="Agregar"
            setOpenPopup={setOpenAddPopup}
            icon={<AddIcon />}
          />
        </Box>
      );
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default ComponenteTable;
