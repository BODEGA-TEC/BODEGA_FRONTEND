import React, { useState, useRef } from "react";
import "../App.css";
import { Container, Grid } from "@mui/material";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { professorsForm, studentsForm } from "../utils/formsData";
import { Button } from "../components/Button/Button";
import SignaturePad from "../components/SignaturePad/SignaturePad";
import createStudentPDF from "../utils/studentPDF";
import createProfessorPDF from "../utils/professorPDF";
import ComponentsForm from "../components/ComponentsForm/ComponentsForm";

const Forms = (props) => {
  const { type } = props;

  const submitRef = useRef(null); // referencia para ejecutar el submit del form del componente DynamicForm
  const submitRef2 = useRef(null);

  const [formInput, setFormInput] = useState({}); // informacion del form.
  const [signature, setSignature] = useState(""); // informacion de la firma.
  const [components, setComponents] = useState([]); // informacion de los componentes.

  // Days of the week list
  const weekday = ["D", "L", "K", "M", "J", "V", "S"];

  // Get actual turno and date from the system date.
  const getTurnoFecha = () => {
    const current = new Date();

    //Fecha  dd/mm/yyyy
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    // Weekday
    let turno = weekday[current.getDay()];

    // 7:30-12md mañana
    // 12:00-4:30 tarde
    // 4:30-8:30pm noche
    const curHr = current.getHours();
    if (curHr < 12) turno += "M";
    else if (curHr < 16) turno += "T";
    else if (curHr === 16 && current.getMinutes() < 31) turno += "T";
    else turno += "N";
    return { turno, date };
  };

  // Check filled fields and generate the pdf and set the respective settings
  const checkFields = () => {
    if (signature === "") {
      alert("Se requiere la firma!");
      return;
    }

    const windowWidth = window.innerWidth;
    let scale = 0.5;
    if (700 < windowWidth) scale = 0.3;
    else if (550 < windowWidth) scale = 0.35;
    else if (500 < windowWidth) scale = 0.4;
    else if (400 < windowWidth) scale = 0.45;

    if (type === 0) {
      const { turno, date } = getTurnoFecha();

      const x = {
        ...formInput,
        Turno: turno,
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
    submitRef2.current.click();
    checkFields();
  };

  return (
    <Container sx={{ marginTop: "2%", marginBottom: "2%" }}>
      <Grid container rowSpacing={2} justifyContent="space-between">
        <Grid item xs={12} md={5}>
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

        <Grid item xs={12} md={7}>
          <Grid container align="justify">
            <ComponentsForm
              submitRef={submitRef2}
              setComponents={setComponents}
            />
          </Grid>
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
