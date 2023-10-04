import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Forms from "./pages/Forms";
import LogIn from "./pages/LogIn";
import News from "./pages/News";
import Terms from "./pages/Terms";
import CreateAcc from "./pages/CreateAcc";
import ConsultInventory from "./pages/ConsultInventory";
import EditInventory from "./pages/EditInventory";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/forms/estudiante" element={<Forms type={0} />} />
          <Route path="/forms/profesor" element={<Forms type={1} />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/news" element={<News />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/create-acc" element={<CreateAcc />} />
          <Route path="/consultInventory" element={<ConsultInventory/>} />
          <Route path="/editInventory" element={<EditInventory/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
