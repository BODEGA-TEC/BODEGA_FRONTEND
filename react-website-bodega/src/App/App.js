import "./App.css";
import React, { useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
// import LogIn from "../pages/LogIn";
import Terms from "../pages/Terms";
import Inventory from "../pages/Inventory";

function App() {
  const [inventoryTab, setInventoryTab] = useState(0); // Gestion del estado de la pestaña

  // Función para cambiar la pestaña en el inventario
  const handleInventoryTabChange = (_, newValue) => {
    setInventoryTab(newValue);
  };

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
            path="/inventario"
            element={<Inventory tab={inventoryTab} setTab={setInventoryTab} />}
          />
          <Route
            path="/inventario"
            element={<Inventory tab={inventoryTab} setTab={setInventoryTab} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
