import "../App/App.css";
import Footer from "../components/Footer/Footer";
import Text from "../components/Text/Text";
import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: "65px",
        }}
      >
        <div style={{ marginLeft: "95px" }}>
          <Text text_style="text_title2" text="SIBE" />
          <Text
            text_style="subtitle"
            text="Escuela de Ingeniería en Electrónica"
          />
        </div>
        <Login />
        <div className="flexGrow">
          <button onClick={signOut}>Cerrar sesión</button>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
