import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import Unauthorized from "../pages/Unauthorized";
import Services from "../pages/Services";
import Terms from "../pages/Terms";
import Inventory from "../pages/Inventory";

const ROLES = {
  'ADMINISTRADOR': 1,
  'PROFESOR': 2,
  'ASISTENTE': 3
}


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
      <Navbar handleTabChange={handleInventoryTabChange} />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          //<Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="services" element={<Services />} />
          <Route path="terms" element={<Terms />} />

          {/* PROTECTED ROUTES */}

          <Route element={<RequireAuth allowedRoles={[ROLES.ADMINISTRADOR, ROLES.ASISTENTE]}/>}>
            <Route
              path="inventario/equipo"
              element={
                <Inventory tab={inventoryTab} setTab={setInventoryTab} />
              }
            />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.ADMINISTRADOR, ROLES.ASISTENTE]}/>}>
            <Route
              path="inventario/componentes"
              element={
                <Inventory tab={inventoryTab} setTab={setInventoryTab} />
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
