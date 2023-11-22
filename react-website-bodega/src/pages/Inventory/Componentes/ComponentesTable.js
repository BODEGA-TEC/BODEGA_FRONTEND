import React, { useEffect, useState, useMemo } from "react";
import "../inventory.css";
import {
  getComponente,
  deleteComponente,
} from "../../../services/ComponentesService";
import PopupButton from "../../../components/PopupButton";
import { defaultPalette } from "../../../config";
import { generateBarcode } from "../../../utils/functions"; // Asegúrate de importar la función correcta
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../utils/constants";

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

  const { hasRole, isLoggedIn } = useAuth();

  const columns = useMemo(
    () =>
      [
        // Condición para mostrar esta columna solo si el usuario está logueado
        isLoggedIn() && {
          accessorKey: "activoBodega",
          header: "ID",
          size: 100,
          enableResizing: false,
          enableGrouping: false,
          enableColumnOrdering: false,
        },
        {
          accessorKey: "descripcion",
          header: "DESCRIPCIÓN",
          minSize: 300,
          size: 400,
          enableGrouping: false,
        },
        {
          accessorKey: "modelo",
          header: "NO. PARTE",
          minSize: 200,
          size: 200,
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
          accessorKey: "cantidad",
          header: "CANTIDAD",
          minSize: 180,
          size: 180,
          enableGrouping: false,
        },
        {
          accessorKey: "condicion",
          header: "CONDICIÓN",
          size: 190,
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
        // Condición para mostrar esta columna solo si el usuario está logueado
        isLoggedIn() && {
          accessorKey: "estante",
          header: "ESTANTE",
          minSize: 170,
          size: 170,
        },
        {
          accessorKey: "observaciones",
          header: "OBSERVACIONES",
          minSize: 240,
          size: 600,
          enableGrouping: false,
        },
        // Condición para mostrar esta columna solo si el usuario está logueado
        isLoggedIn() && {
          accessorKey: "fecha",
          header: "CREADO",
          size: 170,
        },
      ].filter(Boolean), // Filtrar elementos falsos (columnas que no deben mostrarse)
    [isLoggedIn()] // Asegúrate de incluir cualquier dependencia que puedas necesitar
  );

  const fetchData = async () => {
    try {
      const data = await getComponente();
      setRecords(data);
    } catch (error) {
      if (error !== null)
        console.error("Error al recuperar componentes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditButton = (data) => {
    setRecord(data);
    setOpenEditPopup(true);
  };

  // Eliminar componente
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

    // Sin log no se muestran acciones, y si es profesor tampoco.
    enableRowActions: isLoggedIn() && !hasRole(ROLES.PROFESOR),

    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "top",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: defaultPalette,
      rowsPerPageOptions: [10, 25, 50],
      shape: "rounded",
      variant: "outlined",
    },

    muiTableBodyRowProps: ({ row }) => ({
      onClick: (_) => {
        handleEditButton(row.original);
      },
      sx: {
        cursor: "pointer",
      },
    }),

    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          handleDeleteButton(row.original.id);
          closeMenu();
        }}
        sx={{ m: 0 }}
        // Mostrar la opción solo si el usuario es administrador
        style={{
          display: hasRole(ROLES.ADMINISTRADOR) ? "block" : "none",
        }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Eliminar
      </MenuItem>,

      <MenuItem
        key={1}
        onClick={() => {
          handleBarcodeClick(row.original.activoBodega);
          closeMenu();
        }}
        sx={{ m: 0 }}
        // Mostrar la opción solo si el usuario es administrador o asistente
        style={{
          display:
            hasRole(ROLES.ADMINISTRADOR) || hasRole(ROLES.ASISTENTE)
              ? "block"
              : "none",
        }}
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
          {isLoggedIn() &&
          (hasRole(ROLES.ADMINISTRADOR) || hasRole(ROLES.ASISTENTE)) ? (
            <PopupButton
              sx={{ display: "flex" }}
              text="Agregar"
              setOpenPopup={setOpenAddPopup}
              icon={<AddIcon />}
            />
          ) : null}
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
