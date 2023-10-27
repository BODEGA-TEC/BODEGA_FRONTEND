import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getEquipo } from "../../../services/EquipoService"; // Asegúrate de importar desde la ubicación correcta
import "../inventory.css";
import { Grid } from "@mui/material/";

const EquipoDataGrid = ({ setRecord, setOpenPopup }) => {
  const [records, setRecords] = useState([]);
  const columns = [
    {
      field: "activoBodega",
      headerName: "# Activo Bodega",
      flex: 1,
      hideable: false,
    },
    { field: "activoTec", headerName: "# Activo Tec", flex: 1, hideable: true },
    { field: "serie", headerName: "# Serie", flex: 1, hideable: true },
    { field: "estante", headerName: "Estante", flex: 1, hideable: true },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 1,
      hideable: false,
    },
    { field: "categoria", headerName: "Categoría", flex: 1, hideable: true },
    { field: "marca", headerName: "Marca", flex: 1, hideable: true },
    { field: "modelo", headerName: "Modelo", flex: 1, hideable: true },
    { field: "estado", headerName: "Estado", flex: 1, hideable: true },
    { field: "condicion", headerName: "Condición", flex: 1, hideable: true },
    { field: "fecha", headerName: "Fecha Registro", flex: 1, hideable: true },
    {
      field: "observaciones",
      headerName: "Observaciones",
      flex: 1,
      hideable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
          // onClick={handleDeleteClick(id)}
        />,
      ],
    },
  ];

  // Recuperar informacion del datagrid
  const fetchData = async () => {
    try {
      const data = await getEquipo();
      setRecords(data);
    } catch (error) {
      console.error(error);
      // Manejar errores aquí si es necesario
    }
  };

  // Cargar los datos del equipo y aplicar formateo inicial
  useEffect(() => {
    fetchData();
  }, []);

  // Evento doble click en una fila
  const handleRowDoubleClick = (params) => {
    setRecord(params.row);
    setOpenPopup(true);
  };

  return (
    <Grid container style={{ marginTop: "1.5%" }}>
      <Grid item xs={12}>
        <DataGrid
          rows={records}
          columns={columns}
          onRowDoubleClick={handleRowDoubleClick}
          style={{ minHeight: "600px" }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Grid>
    </Grid>
  );
};

export default EquipoDataGrid;
