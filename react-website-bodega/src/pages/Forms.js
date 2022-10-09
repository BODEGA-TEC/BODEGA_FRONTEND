import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { Container, Grid } from "@mui/material";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { studentsForm } from "../utils/formsData";
import { Button } from "../components/Button/Button";
import SignaturePad from "../components/SignaturePad/SignaturePad";
import createPDF from "../utils/studentPDF";
// import ComponentsList from "../components/ComponentsList/ComponentsList";

const Forms = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const submitRef = useRef(); // referencia para ejecutar el submit del form del componente DynamicForm
  const [formInput, setFormInput] = useState({}); // informacion del form.
  const [signature, setSignature] = useState(""); // informacion de la firma.
  const [components, setComponents] = useState([
    { Number: 1, Description: "Multimetro" },
    { Number: 5, Description: "Lagartos" },
    { Number: 12, Description: "Jumpers" },
  ]); // informacion de los componentes.

  // const handleInputChange = (e) => {
  //   console.log("...from handleInputChange", e)
  //   const { name, value } = e;
  //   console.log("...", formInput)
  //   setformInput({
  //     ...formInput,
  //     [name]: value,
  //   });
  // };

  // const delay = ms => new Promise(res => setTimeout(res, ms));

  const [skipFirstRender, setSkipFirstRender] = useState(true);
  useEffect(() => {
    if (skipFirstRender) setSkipFirstRender(false);
    if (!skipFirstRender) generatePDF();
  }, [formInput]);

  const generatePDF = () => {

    if (signature === "") {
      alert("Se requiere su firma!");
      return
    }

    const windowWidth = window.innerWidth
    // console.log("Width", windowWidth)
    let scale = 0.45;
    if (550 < windowWidth) scale = 0.25
    if (500 < windowWidth) scale = 0.30
    else if (400 < windowWidth) scale = 0.35
    
    const x = {
      ...formInput,
      Fecha: date,
      Firma: signature,
      Componentes: components,
      scale: scale,
    };
    // console.log(x)
    createPDF(x);
  };

  const handleSubmit = async () => {
      submitRef.current.click();
  };

  return (
    <Container sx={{ marginTop: "2%", marginBottom: "3%" }}>
      <Grid container rowSpacing={2} justifyContent="space-between">
        <Grid container align="justify">
          <Grid item xs={12} md={6}>
            <DynamicForm
              title={studentsForm.title}
              description={studentsForm.description}
              form={studentsForm.form}
              submitRef={submitRef}
              setFormInput={setFormInput}
            />
          </Grid>

          <Grid item xs={12} md={6} justifyContent="center">
            {/* <ComponentsList/> */}
            Components
          </Grid>

          <Grid item xs={12} md={6} justifyContent="center">
            <SignaturePad
              title="Firma del estudiante"
              setSignature={setSignature}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ marginTop: "2%" }}
          justifyContent="space-evenly"
          align="center"
        >
          <Grid item xs={12} md={12} align="center">
            <Button
              className="btns"
              buttonStyle="btn--submit"
              buttonSize="btn--small"
              onClick={handleSubmit}
            >
              PDF <i className="far fa-file-pdf" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forms;
