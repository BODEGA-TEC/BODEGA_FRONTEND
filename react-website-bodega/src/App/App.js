import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
// import LogIn from "../pages/LogIn";
import Terms from "../pages/Terms";
import Inventory from "../pages/Inventory";

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
      <Router>
        <Navbar handleTabChange={handleInventoryTabChange} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/log-in" element={<LogIn />} /> */}
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/inventario/equipo"
            element={<Inventory tab={inventoryTab} setTab={setInventoryTab} />}
          />
          <Route
            path="/inventario/componentes"
            element={<Inventory tab={inventoryTab} setTab={setInventoryTab} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
