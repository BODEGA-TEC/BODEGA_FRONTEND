import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from '../Button/Button';
import "../../App.css";
import Input from "./Input";
import { Container, Grid } from "@mui/material";

//Error Component
const Error = ({ children }) => <p style={{ color: "red", fontSize:'12px' }}>{children}</p>;

const DynamicForm = (props) => {
  
  const { formData, handleInputChange, jsonForm } = props;

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {}
  });

  const formInputs = Object.keys(jsonForm).map((e) => {
    const { rules, defaultValue, label } = jsonForm[e];

    return (
      <section key={e}>
        {/* <label>{label}</label> */}
        <Controller sx={{ marginTop:'4%' }}
          name={e}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div>
              <Input
                label={label}
                value={field.value}
                setFormData
                onChange={handleInputChange}
                {...jsonForm[e]}
              />
            </div>
          )}
        />
        {errors[e] && <Error>Espacio requerido</Error>}
      </section>
    );
  });


  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Container sx={{ marginTop: '2%' }}>
      <Grid container rowSpacing={3}>
        
        <Grid item xs={12} md={12} align="center">
          <h2>Solicitud de Componentes y Equipo para Estudiantes</h2>
        </Grid>

        <Grid item xs={12} md={12}  align="">
          <p>El siguiente formulario esta diseñado con el objetivo de que la comunidad estudiantil pueda generar una solicitud de componentes o equipos al departamento de Bodega de la Escuela de Ingeniería Electrónica.</p>
        </Grid>

        <Grid item xs={12} md={12} align="justify">
          <form>
            {formInputs}
          </form>
        </Grid>

      </Grid>
      
    </Container>  
  );
};
  

export default DynamicForm;