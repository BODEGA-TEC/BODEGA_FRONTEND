import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";
import Home from "../pages/Home";
import Unauthorized from "../pages/Unauthorized";
import Services from "../pages/Services";
import Terms from "../pages/Terms";
import Inventory from "../pages/Inventory";
import Maintenance from "../pages/Maintenance";
import Registration from "../pages/Registration";
import Returned from "../pages/Returned";
import PersistLogin from "../components/Login/PersistLogin";
import { ROLES } from "../utils/constants";

function App() {
  // Recuperar el estado del tab al cargar la aplicación
  const [inventoryTab, setInventoryTab] = useState(() => {
    const storedTab = localStorage.getItem("currentTab");
    return storedTab ? parseInt(storedTab, 10) : 0;
  });

  // Función para cambiar la pestaña en el inventario
  const handleInventoryTabChange = (_, newValue) => {
    setInventoryTab(newValue);
  };

  // Almacenar el estado del tab en localStorage cada vez que cambie
  // Al hacer reload no se pierde el tab actual
  useEffect(() => {
    localStorage.setItem("currentTab", String(inventoryTab));
  }, [inventoryTab]);

  return (
    <>
      {/* Barra de navegación */}
      <Navbar handleTabChange={handleInventoryTabChange} />

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="services" element={<Services />} />
          <Route path="terms" element={<Terms />} />

          {/* Rutas protegidas */}
          <Route element={<PersistLogin />}>
            {/* Rutas para el inventario */}
            <Route
              path="inventario/equipo"
              element={
                <Inventory tab={inventoryTab} setTab={setInventoryTab} />
              }
            />
            <Route
              path="inventario/componentes"
              element={
                <Inventory tab={inventoryTab} setTab={setInventoryTab} />
              }
            />

            {/* Rutas protegidas para administradores */}
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="maintenance" element={<Maintenance />} />
              {/* Ruta para el registro de asistentes */}
              <Route path="register" element={<Registration />} />
            </Route>

            {/* Rutas protegidas para administradores y asistentes */}
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.ASISTENTE]} />
              }
            >
              <Route path="returned" element={<Returned />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
