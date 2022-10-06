import React from 'react'
import { Button, Container, Grid, TextField,Select, MenuItem, FormControl, FormHelperText,InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, Form } from '../UseForm/useForm';
import { isNumber } from '../../utils/formsUtils'

const PersonalInfo = ({ nextStep, setFormData }) => {
  

  const courses = ['Laboratorio de Elementos Activos', 'Taller de Diseño Digital', 'Taller de Diseño Analógico'];
  const [Courses] = useState(courses);

  const initialValues = {
    Nombre: "",
    PrimerApellido: "",
    SegundoApellido: "",
    Carnet: "",
    Curso: ""
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialValues, true);
  
  useEffect(() => {
    setFormData(values)
  }, [values])


  /**
   * @description Validates all the established restrictions for these fields
   * @param {Object} fieldValues field's values of the form 
   * @returns true if any error ocurr, false otherwise
   */
  
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('Nombre' in fieldValues) {
      temp.Nombre = fieldValues.Nombre === "" ? "Este espacio es requerido" : ""
    }
    if ('Nombre' in fieldValues && fieldValues.Nombre.length > 30) {
      temp.Nombre = "El nombre no puede exceder los 30 caracteres."
    }

    if ('PrimerApellido' in fieldValues) {
      temp.PrimerApellido = fieldValues.PrimerApellido === "" ? "Este espacio es requerido" : ""
    }
    if ('PrimerApellido' in fieldValues && fieldValues.PrimerApellido.length > 30) {
      temp.PrimerApellido = "El nombre no puede exceder los 30 caracteres."
    }

    if ('SegundoApellido' in fieldValues) {
      temp.SegundoApellido = fieldValues.SegundoApellido === "" ? "Este espacio es requerido" : ""
    }
    if ('SegundoApellido' in fieldValues && fieldValues.SegundoApellido.length > 30) {
      temp.SegundoApellido = "El nombre no puede exceder los 30 caracteres."
    }

    if ('Carnet' in fieldValues) {
      temp.Carnet = fieldValues.Carnet === "" ? "Este espacio es requerido" : ""
      if (fieldValues.Carnet !== "") {
        if (!isNumber(fieldValues.Carnet)) {
          temp.Carnet = "Ingrese un carné válido"
        }
      }
    }
  
    setErrors({
      ...temp
    })
  
    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }
  
  /**
   * @description Submits the information entered by the user. Before 
   * submits checks restrictions calling valite 
   */
  const submit = (e) => {
    e.preventDefault();
    if (validate()) { // If pass, no empty values
      console.log(values)
      nextStep()
    }
  }

  const style = 'standard';
  return (
    <div sx={{marginTop: '2%'}}>
      <Form onSubmit={submit}>
        {/* <AlertDialog title={titleDialog} open={openDialog} handleClose={setOpenDialog} content={bodyDialog}/>  */}

        <Grid container rowSpacing={6}>
          
          <Grid item xs={12} md={11} align="justify">
            <h1>Solicitud de componentes y equipo para estudiantes</h1>
            <p mt='6%'>El siguiente formulario esta diseñado con el objetivo de que la comunidad estudiantil pueda generar una solicitud de componentes o equipos al departamento de Bodega de la Escuela de Ingeniería Electrónica. Por lo cual, se solicita la adecuada revisión antes de enviarlo para minimizar los errores y problemas en el proceso de solicitud.</p>
          </Grid>

          <Grid item md={12}>
            
            <Grid container rowSpacing={5}>
              
              <Grid item xs={12} md={6}>
                <Grid container justifyContent='flex-start'>
                  <TextField 
                    label="Primer Apellido*"
                    variant={style}
                    name="PrimerApellido"
                    placeholder="Ingrese su primer apellido "
                    value={values.PrimerApellido}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ maxLength: 30 }}
                    sx={{ width: '85%' }} 
                    {...(errors.PrimerApellido && { error: true, helperText: errors.PrimerApellido })}
                  />
                </Grid>  
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Grid container justifyContent='flex-start'>
                  <TextField
                    variant={style}
                    label="Segundo Apellido*"
                    name="SegundoApellido"
                    placeholder="Ingrese su segundo apellido "
                    value={values.SegundoApellido}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    sx={{ width: '85%' }}
                    inputProps={{ maxLength: 30 }}
                    {...(errors.SegundoApellido && { error: true, helperText: errors.SegundoApellido })}
                  />
                </Grid>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Grid container justifyContent='flex-start'>
                  <TextField
                    variant={style}
                    label="Nombre*"
                    name="Nombre"
                    placeholder="Ingrese su nombre"
                    value={values.Nombre}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ width: '85%' }}
                    inputProps={{ maxLength: 30 }}
                    {...(errors.Nombre && { error: true, helperText: errors.Nombre })}
                  />
                </Grid>
              </Grid> 
              
              <Grid item xs={12} md={6}>
                <Grid container justifyContent='flex-start'>
                  <TextField
                    // type = 'text'
                    variant={style}
                    label="Carné *"
                    name="Carnet"
                    placeholder="Ingrese su carné"
                    value={values.Carnet}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ maxLength: 10 }}
                    sx={{ width: '85%' }}
                    {...(errors.Carnet && { error: true, helperText: errors.Carnet })}
                  />
                </Grid>
              </Grid>
  
              <Grid item xs={12} md={7}>
                <Grid container justifyContent='flex-start'>
                  <FormControl fullWidth>
                    <InputLabel id="courseBox">Curso*</InputLabel>
                    <Select
                      // required
                      label="Curso *"
                      variant = {style}
                      name="Curso"
                      id="courseBox"
                      value={values.Curso}
                      onChange={handleInputChange}
                      sx={{ width: '85%' }}
                      error={errors.Curso !== "" && errors.Curso !== undefined ? true : false}
                    >
                      {
                        Courses.map((e, i) => {
                          return (
                            <MenuItem key={i} value={e}> {e}</MenuItem>
                          )
                        })
                      }
                    </Select>
                    {errors.Curso && <FormHelperText htmlFor="courseBox" error> {errors.Curso} </FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}> </Grid>

              <Grid item xs={12} md={6}>
                <Grid container justifyContent='flex-end'>
                  <Button style={{ background: '#D11616' }} variant="contained" type="submit"> Siguiente </Button>
                </Grid>
              </Grid>        
            </Grid>               
          </Grid>
        </Grid> 
      </Form>
    </
    div>
  )
  

  
}


export default PersonalInfo;