import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { Container, Grid } from "@mui/material";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { studentsForm } from "../utils/formsData";
import { Button } from "../components/Button/Button";
import SignaturePad from "../components/SignaturePad/SignaturePad";
import createPDF from "../utils/studentPDF";

const Forms = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const submitRef = useRef(); // referencia para ejecutar el submit del form del componente DynamicForm
  const [formInput, setFormInput] = useState({}); // informacion del form.
  const [signature, setSignature] = useState(""); // informacion de la firma.
  const [components, setComponents] = useState([
    { Cantidad: 1, Descripción: "Multimetro" },
    { Cantidad: 5, Descripción: "Lagartos" },
    { Cantidad: 12, Descripción: "Jumpers" },
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
    const x = {
      ...formInput,
      Fecha: date,
      Firma: signature,
      Componentes: components,
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

          <Grid item xs={12} justifyContent="center">
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