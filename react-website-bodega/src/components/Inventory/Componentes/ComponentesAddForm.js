import React, { useState, useEffect } from "react";
import { Grid, Alert } from "@mui/material";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../hooks/useForm";
import * as ComponentesService from "../../../services/ComponentesService";
import { CONDICIONITEMS } from "../../../utils/constants";
import { handleNumericKeyPress } from "../../../utils/functions"; // Asegúrate de importar la función correcta

const initialFValues = {
  id: 0,
  categoriaId: "",
  estadoId: "",
  condicion: CONDICIONITEMS[0].label,
  descripcion: "",
  cantidadTotal: "",
  cantidadDisponible: "",
  noParte: "",
  estante: "",
  observaciones: "",
};

export default function ComponentesForm(props) {
  // Select
  const { categorias, estados } = props.options;
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");

  // Alertas
  const [errorFlag, setErrorFlag] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Funcion de validacion
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // Validar categoriaId
    if ("categoriaId" in fieldValues)
      temp.categoriaId = fieldValues.categoriaId
        ? ""
        : "La categoría es requerida.";

    // Validar estadoId
    if ("estadoId" in fieldValues)
      temp.estadoId = fieldValues.estadoId ? "" : "El estado es requerido.";

    // Validar condicion
    if ("condicion" in fieldValues)
      temp.condicion = fieldValues.condicion
        ? ""
        : "La condición es requerida.";

    // Validar descripcion
    if ("cantidadTotal" in fieldValues)
      temp.cantidadTotal = fieldValues.cantidadTotal
        ? ""
        : "La cantidad total es requerida.";

    if ("cantidadDisponible" in fieldValues) {
      // Validate the condition
      if (fieldValues.cantidadDisponible > fieldValues.cantidadTotal) {
        // If the condition is not met, set an error message
        temp.cantidadDisponible =
          "La cantidad disponible debe ser menor o igual a la cantidad total.";
      }
    }
    // Validar descripcion
    if ("descripcion" in fieldValues)
      temp.descripcion = fieldValues.descripcion
        ? ""
        : "La descripción es requerida.";

    // Validar estante
    if ("estante" in fieldValues)
      temp.estante = fieldValues.estante ? "" : "El estante es requerido.";

    setErrors({ ...temp });

    // Comprobar si todos los errores están vacíos
    return Object.values(temp).every((x) => x === "");
  };

  // Función para restablecer los valores
  const resetStateValues = () => {
    setEstado(estados[0].label);
    setCategoria("");
    // Actualizar estadoId en values
    setValues((prevValues) => ({
      ...prevValues,
      estadoId: estados[0].id,
    }));
  };

  // Props del form
  const { values, errors, setValues, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // Crear componente
  const postComponente = (componente) => {
    // Llama a la función del servicio para agregar un nuevo activo
    ComponentesService.postComponente(componente)
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

  // Manejador de evento para select
  const handleSelectChange = (setter, options) => (e) => {
    const { name, value } = e.target;
    const selectedItem = options.find((item) => item.label === value);
    setter(selectedItem ? selectedItem.label : "");

    // Llama a handleInputChange con el valor seleccionado
    handleInputChange({
      target: { name: `${name}Id`, value: selectedItem ? selectedItem.id : "" },
    });
  };

  useEffect(() => {
    // Al modificar cantidadTotal, asigna automáticamente ese valor a cantidadDisponible
    setValues((prevValues) => ({
      ...prevValues,
      cantidadDisponible: values.cantidadTotal,
    }));
  }, [values.cantidadTotal]);

  useEffect(() => {
    // Si cantidadDisponible es "", toma el valor de cantidadTotal siempre y cuando cantidadTotal no sea ""
    if (values.cantidadDisponible === "" && values.cantidadTotal !== "") {
      setValues((prevValues) => ({
        ...prevValues,
        cantidadDisponible: values.cantidadTotal,
      }));
    }
  }, [values.cantidadTotal, values.cantidadDisponible]);

  // Evento de finalizar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      postComponente(values);
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
            name="noParte"
            label="No. Parte"
            value={values.noParte}
            onChange={handleInputChange}
            error={errors.noParte}
          />
        </Grid>

        {/* Estado */}
        <Grid item xs={12} sm={6}>
          <Controls.Input
            name="cantidadTotal"
            label="Cantidad Total"
            type="number"
            value={values.cantidadTotal}
            onChange={handleInputChange}
            onKeyPress={handleNumericKeyPress}
            error={errors.cantidadTotal}
            inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]" }}
          />

          <Controls.Input
            name="cantidadDisponible"
            label="Cantidad Disponible"
            type="number"
            value={values.cantidadDisponible}
            onChange={handleInputChange}
            onKeyPress={handleNumericKeyPress}
            error={errors.cantidadDisponible}
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
          <Controls.Button type="submit" text="Agregar" />
          <Controls.Button
            text="Borrar"
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
