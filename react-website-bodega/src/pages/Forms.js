import React, { useEffect, useState } from "react";
import "../App.css";
import { Container, Grid } from "@mui/material";
// import StudentInfo from '../components/Forms/StudentInfo';
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { studentsForm } from "../utils/formsJSON";
import { Button } from "../components/Button/Button";
import SignaturePad from "../components/SignaturePad/SignaturePad";

const Forms = () => {
  const initialValues = {
    Nombre: "",
    PrimerApellido: "",
    SegundoApellido: "",
    Carnet: "",
    Curso: "",
    Firma: "",
    Equipo: {},
  };

  const [formData, setFormData] = useState(initialValues); // informacion del form.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setSignature = (url) => {
    setFormData({ ...formData, Firma: url });
  };

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <Container sx={{ marginTop: "2%", marginBottom: "3%" }}>
      <Grid container xs={12} md={6}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12} justifyContent="center" align="justify">
            <DynamicForm
              formData={formData}
              setFormData={handleInputChange}
              jsonForm={studentsForm}
            />
          </Grid>

          <Grid item xs={12} justifyContent="center">
            <SignaturePad title="Firme Aquí" setSignature={setSignature}>
              {" "}
            </SignaturePad>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{ marginTop: "2%" }} xs={12} md={12}>
        <Grid item xs={12} md={12} justifyContent="center">
          <Button
            className="btns"
            buttonStyle="btn--submit"
            buttonSize="btn--small"
            onClick={onSubmit()}
          >
            PDF <i className="far fa-file-pdf" />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forms;
