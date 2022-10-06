import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import {Container, ToggleButton, Grid} from "@mui/material";
import PersonalInfo from '../components/Forms/PersonalInfo';
import Equipment from '../components/Forms/Equipment';
import Confirm from '../components/Forms/Confirm';
import DynamicForm from '../components/DynamicForm/DynamicForm';

const Forms = () => {

  const [step, setStep] = useState(0) // número de página del form.
  const [form, setForm] = useState(true) // form de estudiantes o profesores.
  const [equipment, setEquipment] = useState([]); // lista del equipo solicitado.
  const [formData, setFormData] = useState({}) // informacion del form.
  const navigate = useNavigate();

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
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    carnet: "",
    curso: ""
  }

  //   /**
  //    * This function calls the function to generate the pdf with all information.
  //    */
  //    const submitForm = (valuesForm) => { 
  //     // const assignedEquipment = getEquipment(equipment)
  //     // const assignedEquipment = getAssignedConstructor(constructorTeam2)

  //  }
  
  // useEffect(() => {
  //   setValuesStep1(values)
  // }, [values])
  
  // useEffect(() => {
  //   handleChangeStep(step);
  // }, [step]);
  
  // const handleChangeStep = (currentStep) => {
  // };

  // const handleChangeForm = () => {
  //   (form === toggle1 ? setForm(toggle2) : setForm(toggle1))
  // };


  return (
    <Container sx={{ marginTop: '2%', marginBottom: '3%' }}>
      <Grid container rowSpacing={2}>
{/* 
        <Grid item xs={12} md={12}>  
          <ToggleButton
            value="form"
            selected={form}
            onChange={() => handleChangeForm()}>
          </ToggleButton >
        </Grid> */}
        
        <Grid item md={7}>
          {step === 0 && <PersonalInfo
            setFormData={setFormData}
            nextStep={nextStep}
          />}
          {step === 1 && <Equipment
            // handleChangeForm={handleChangeForm}    
            // setValues={setCertificateDataFormValues}                                    
            // defaultValues={certificateDataFormValues}
            // prevStep={prevStep}
            // nextStep={nextStep}
          />}
          {step === 2 && <Confirm
            // onStepFinish={onFinish}
            // handleChangeForm={handleChangeForm}              
            // setValues={setQSCDeviceDataFormValues}                                 
            // defaultValues={qSCDDeviceDataFormValues}
            // prevStep={prevStep}
            // nextStep={nextStep}
          />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Forms;