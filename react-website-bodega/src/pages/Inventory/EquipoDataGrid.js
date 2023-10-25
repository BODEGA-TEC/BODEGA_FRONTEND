import Footer from "../../components/Footer/Footer";
import Text from "../../components/Text/Text";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getEquipo } from "../../services/EquipoService"; // Asegúrate de importar desde la ubicación correcta
import "./inventory.css";

const Inventory = () => {
  const [rows, setRows] = useState([]);
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
    { field: "model", headerName: "Modelo", flex: 1, hideable: true },
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
  const fetchData = useCallback(async () => {
    try {
      const data = await getEquipo();
      setRows(data);
    } catch (error) {
      console.error(error);
      // Manejar errores aquí si es necesario
    }
  }, []);

  useEffect(() => {
    // Cargar los datos del equipo y aplicar formateo inicial
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="datagrid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 20, 40]}
        />
      </div>
    </>
  );
};

export default Inventory;
