import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { Container, Grid } from "@mui/material";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { professorsForm, studentsForm } from "../utils/formsData";
import { Button } from "../components/Button/Button";
import SignaturePad from "../components/SignaturePad/SignaturePad";
import createStudentPDF from "../utils/studentPDF";
import createProfessorPDF from "../utils/professorPDF";

import ComponentsBox from "../components/ComponentsBox/ComponentsBox";

const Forms = (props) => {
  const { type } = props;

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const submitRef = useRef(); // referencia para ejecutar el submit del form del componente DynamicForm
  const [formInput, setFormInput] = useState({}); // informacion del form.
  const [signature, setSignature] = useState(""); // informacion de la firma.
  const [components, setComponents] = useState([]); // informacion de los componentes.

  // const delay = ms => new Promise(res => setTimeout(res, ms));
  const [skipFirstRender, setSkipFirstRender] = useState(true);
  useEffect(() => {
    if (skipFirstRender) setSkipFirstRender(false);
    if (!skipFirstRender) generatePDF();
  }, [formInput]);

  const generatePDF = () => {
    if (signature === "") {
      alert("Se requiere la firma!");
      return;
    }

    const windowWidth = window.innerWidth;
    let scale = 0.45;
    if (700 < windowWidth) scale = 0.2;
    else if (550 < windowWidth) scale = 0.25;
    else if (500 < windowWidth) scale = 0.3;
    else if (400 < windowWidth) scale = 0.35;

    if (type === 0) {
      const x = {
        ...formInput,
        Fecha: date,
        Firma: signature,
        Componentes: components,
        scale: scale,
      };

      createStudentPDF(x);
    } else {
      const x = {
        ...formInput,
        Firma: signature,
        Componentes: components,
        scale: scale,
      };
      createProfessorPDF(x);
    }
    
  };


  const handleSubmit = async () => {
    submitRef.current.click();
  };

  return (
    <Container sx={{ marginTop: "2%", marginBottom: "2%" }}>
      <Grid container rowSpacing={2} justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Grid container align="justify">
            <Grid item xs={12} md={12}>
              {type === 0 ? (
                <DynamicForm
                  title={studentsForm.title}
                  description={studentsForm.description}
                  form={studentsForm.form}
                  submitRef={submitRef}
                  setFormInput={setFormInput}
                />
              ) : (
                <DynamicForm
                  title={professorsForm.title}
                  description={professorsForm.description}
                  form={professorsForm.form}
                  submitRef={submitRef}
                  setFormInput={setFormInput}
                />
              )}
            </Grid>

            <Grid item xs={12} md={12} justifyContent="center">
              {type === 0 ? (
                <SignaturePad
                  title="Firma del estudiante"
                  setSignature={setSignature}
                />
              ) : (
                <SignaturePad
                  title="Firma del profesor"
                  setSignature={setSignature}
                />
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <ComponentsBox setComponents={setComponents} />
        </Grid>

        <Grid container justifyContent="space-evenly" align="center">
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
