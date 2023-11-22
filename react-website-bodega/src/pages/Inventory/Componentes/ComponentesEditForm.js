import React, { useState, useEffect } from "react";
import { Grid, Alert } from "@mui/material";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../hooks/useForm";
import * as ComponentesService from "../../../services/ComponentesService";
import { CONDICIONITEMS } from "../../../utils/constants";
import { handleNumericKeyPress } from "../../../utils/functions"; // Asegúrate de importar la función correcta

export default function ComponenteForm(props) {
  // Informacion
  const { record } = props;

  // Select
  const { categorias, estados } = props.options;
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");

  // Edit button
  const [editButtonDisable, setEditButtonDisable] = useState(true);
  const unchangedRecord = record;

  // Alertas
  const [errorFlag, setErrorFlag] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Funcion de validacion - por si mas adelante ha de validarse algo
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    setErrors({ ...temp });

    // Comprobar si todos los errores están vacíos
    return Object.values(temp).every((x) => x === "");
  };

  // Función para restablecer los valores sin cambios
  const resetStateValues = () => {
    setEstado(unchangedRecord.estado);
    setCategoria(unchangedRecord.categoria);
  };

  // Props del form
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    unchangedRecord,
    true,
    validate
  );

  // Update componente
  const putComponente = (componente) => {
    // Llama a la función del servicio para agregar un nuevo activo
    ComponentesService.putComponente(componente.id, componente)
      .then(({ message }) => {
        // Muestra la alerta de éxito
        setErrorFlag(false);
        setAlertMessage(message);
        setAlertVisible(true);

        // Recarga la página después de un breve retraso (valor de tiempo en milisegundos)
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        // Muestra la alerta de éxito
        setAlertMessage(error.message);
        setAlertVisible(true);
      });
  };

  // Establecer en el valor respectivo con la informacion
  useEffect(() => {
    setCategoria(record.categoria);
    setEstado(record.estado);
  }, [record.categoria, record.estado]);

  useEffect(() => {
    // Verifica si los valores son iguales y habilita o deshabilita el botón de edición
    const valuesAreEqual =
      JSON.stringify(values) === JSON.stringify(unchangedRecord);
    setEditButtonDisable(valuesAreEqual);
  }, [values, unchangedRecord]);

  // Evento de seleccionar
  const handleSelectChange = (setter, options) => (e) => {
    const { name, value } = e.target;
    const selectedItem = options.find((item) => item.label === value);
    setter(selectedItem ? selectedItem.label : "");

    // Llama a handleInputChange con el valor seleccionado
    handleInputChange({
      target: { name: `${name}Id`, value: selectedItem ? selectedItem.id : "" },
    });
  };

  // Evento de finalizar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      putComponente(values);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing={"1.5%"}>
        {/* Descripción y Estante*/}
        <Grid item xs={12} sm={9}>
          <Controls.Input
            name="descripcion"
            label="Descripción"
            value={values.descripcion}
            onChange={handleInputChange}
            error={errors.descripcion}
          />
        </Grid>

        {/* Estante */}
        <Grid item xs={12} sm={3}>
          <Controls.Input
            name="estante"
            label="Estante"
            value={values.estante}
            onChange={handleInputChange}
            error={errors.estante}
          />
        </Grid>

        {/* Marca */}
        <Grid item xs={12} sm={6}>
          {/* Categoria */}
          <Controls.Select
            name="categoria"
            label="Categoría"
            value={categoria}
            onChange={handleSelectChange(setCategoria, categorias)}
            options={categorias}
            error={errors.categoriaId}
          />

          {/* Modelo */}
          <Controls.Input
            name="modelo"
            label="Modelo"
            value={values.modelo}
            onChange={handleInputChange}
            error={errors.modelo}
          />
        </Grid>

        {/* Estado */}
        <Grid item xs={12} sm={6}>
          <Controls.Select
            name="estado"
            label="Estado"
            value={estado}
            onChange={handleSelectChange(setEstado, estados)}
            options={estados}
            error={errors.estadoId}
          />

          <Controls.Input
            name="cantidad"
            label="Cantidad"
            type="number"
            value={values.cantidad}
            onChange={handleInputChange}
            onKeyPress={handleNumericKeyPress}
            error={errors.cantidad}
            inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]" }}
          />
        </Grid>

        {/* Condicion */}
        <Grid item xs={12} sm={12}>
          <Controls.RadioGroup
            name="condicion"
            label="Condición"
            size="small"
            value={values.condicion}
            onChange={handleInputChange}
            items={CONDICIONITEMS}
          />
        </Grid>

        {/* Observaciones */}
        <Grid item xs={12} sm={12}>
          <Controls.Input
            name="observaciones"
            label="Observaciones"
            value={values.observaciones}
            onChange={handleInputChange}
            error={errors.observaciones}
            multiline
            rows={5}
          />
        </Grid>

        <Grid item xs={12} sm={12} justifyContent="center">
          {alertVisible && (
            <Alert
              severity={errorFlag ? "error" : "success"}
              onClose={() => setAlertVisible(false)}
            >
              {alertMessage}
            </Alert>
          )}
        </Grid>

        <Grid container item xs={12} sm={12} justifyContent="flex-end">
          <Controls.Button
            type="submit"
            text="Aplicar"
            disabled={editButtonDisable}
          />
          <Controls.Button
            text="Descartar"
            color="inherit"
            onClick={() => {
              resetForm();
              resetStateValues();
            }}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
