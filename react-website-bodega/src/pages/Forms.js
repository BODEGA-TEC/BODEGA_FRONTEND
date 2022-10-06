import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import {Container, ToggleButton, Grid} from "@mui/material";
import StudentInfo from '../components/Forms/StudentInfo';
import Equipment from '../components/Forms/Equipment';

const Forms = () => {

  const [step, setStep] = useState(0) // número de página del form.
  // const [form, setForm] = useState(true) // form de estudiantes o profesores.
  const [formData, setFormData] = useState({}) // informacion del form.
  // const navigate = useNavigate();

  // const toggle1 = 'Estudiante';
  // const toggle2 = 'Profesor';
  
  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };
  
  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };

  const initialValues = {
    Nombre: "",
    PrimerApellido: "",
    SegundoApellido: "",
    Carnet: "",
    Curso: "",
    Signature: "",
    Equipo:{}
  }

  return (
    <Container sx={{ marginTop: '2%', marginBottom: '3%' }}>
      {step === 0 && <StudentInfo
        initialValues={initialValues}
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />}
      {step === 1 && <Equipment
        formData={formData}
        setFormData={setFormData}
        prevStep={prevStep}
        nextStep={nextStep}
      />}
    </Container>
  );
}

export default Forms;