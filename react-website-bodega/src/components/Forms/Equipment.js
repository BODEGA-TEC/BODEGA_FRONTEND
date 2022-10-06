import React from 'react'
import { Button, Container, Grid} from "@mui/material";
import { pdfGenerator } from '../../utils/studentPDF';

const Equipment = (props) => {
  const { prevStep, nextStep, formData, setFormData } = props;

  const onSubmit = () => {
    pdfGenerator(formData);
  }

  return (
    <Container sx={{marginTop: '2%'}}>
      <Grid container mt="2%" justifyContent='flex-start'>
        <Button variant="contained" onClick={prevStep}>Atrás</Button>
      </Grid>
      <Grid container mt="2%" justifyContent='flex-start'>
        <Button style={{ background: '#D11616' }} variant="contained" onClick={onSubmit()} type="submit"> Generar pdf </Button>
      </Grid>
    </Container>
  )
}

export default Equipment