import "../App/App.css";
import Footer from "../components/Footer/Footer";
import Text from "../components/Text/Text";
import Login from "../components/Login/Login";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

const Home = () => {
  //const { setAuth } = useContext(AuthContext);
  //const navigate = useNavigate();

  // const logout = async () => {
  //   // if used in more components, this should be in context
  //   // axios to /logout endpoint
  //   setAuth({});
  //   navigate("/");
  // };

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
      </div>
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
