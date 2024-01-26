import React from "react";
import Register from "../components/Register/Register";
import Footer from '../components/Footer/Footer';

export default function Registration() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
        <Register />
      </div>
      <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
        <Footer />
      </div>
    </>
  );
}