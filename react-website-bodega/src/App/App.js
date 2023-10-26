import "./App.css";
import Navbar from "../components/NavBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
// import LogIn from "../pages/LogIn";
import Terms from "../pages/Terms";
import Inventory from "../pages/Inventory";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/log-in" element={<LogIn />} /> */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/inventario" element={<Inventory tab={0} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
