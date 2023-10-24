import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import LogIn from "./pages/LogIn";
import Terms from "./pages/Terms";
import CreateAcc from "./pages/CreateAcc";
import ConsultInventory from "./pages/ConsultInventory";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/create-acc" element={<CreateAcc />} />
          <Route path="/consultInventory" element={<ConsultInventory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
