import React, { useState, useEffect } from "react";
import { Grid, Alert } from "@mui/material";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../hooks/useForm";
import * as ComponentesService from "../../../services/ComponentesService";
import { handleNumericKeyPress } from "../../../utils/functions"; // Asegúrate de importar la función correcta
import useAuth from "../../../hooks/useAuth";
import { CONDICIONITEMS, ROLES } from "../../../utils/constants";
import { Edit } from "@mui/icons-material";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ComponenteForm(props) {
  const axiosPrivate = useAxiosPrivate();

  // Informacion
  const { record } = props;

  // Auth
  const { hasRole, isLoggedIn } = useAuth();

  // Select
  const { categorias, estados } = props.options;
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");

  // Edit button
  const [editMode, setEditMode] = useState(false); // Activar modo edicion
  const [applyButtonDisable, setApplyButtonDisable] = useState(true); //Desabilitar boton aplicar
  const unchangedRecord = record; // Datos sin cambios

  // Alertas
  const [errorFlag, setErrorFlag] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Funcion de validacion - por si mas adelante ha de validarse algo
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

  // Función para restablecer los valores sin cambios
  const handleCancelEditMode = () => {
    setEstado(unchangedRecord.estado);
    setCategoria(unchangedRecord.categoria);
    setEditMode(false);
  };

  // Habilita el modo editar
  const handleEnableEditMode = () => {
    setEditMode(true);
  };

  // Props del form
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(unchangedRecord, true, validate);

  // Update componente
  const putComponente = (componente) => {
    // Llama a la función del servicio para agregar un nuevo activo
    ComponentesService.putComponente(axiosPrivate, componente.id, componente)
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
    setApplyButtonDisable(valuesAreEqual);
  }, [values, unchangedRecord]);

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

  // Verificar si el usuario puede editar (está logeado y es administrador)
  const hasEditRights = () => {
    return isLoggedIn() && hasRole(ROLES.ADMIN);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container alignItems="flex-start" spacing={"1.5%"}>
        {/* Descripción y Estante*/}
        <Grid item xs={12} sm={isLoggedIn() ? 9 : 12}>
          <Controls.Input
            name="descripcion"
            label="Descripción"
            value={values.descripcion}
            onChange={handleInputChange}
            error={errors.descripcion}
            readOnly={!editMode}
          />
        </Grid>

        {/* Estante */}
        <Grid
          item
          xs={12}
          sm={3}
          style={{ display: isLoggedIn() ? "block" : "none" }}
        >
          <Controls.Input
            name="estante"
            label="Estante"
            value={values.estante}
            onChange={handleInputChange}
            error={errors.estante}
            readOnly={!editMode}
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
            readOnly={!editMode}
          />

          {/* Modelo */}
          <Controls.Input
            name="noParte"
            label="No. Parte"
            value={values.noParte}
            onChange={handleInputChange}
            error={errors.noParte}
            readOnly={!editMode}
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
            readOnly={!editMode}
          />

          {isLoggedIn() && (
            <Controls.Input
              name="cantidadTotal"
              label="Cantidad Total"
              type="number"
              value={values.cantidadTotal}
              onChange={handleInputChange}
              onKeyPress={handleNumericKeyPress}
              error={errors.cantidadTotal}
              inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]" }}
              readOnly={!editMode}
            />
          )}

          <Controls.Input
            name="cantidadDisponible"
            label="Cantidad Disponible"
            type="number"
            value={values.cantidadDisponible}
            onChange={handleInputChange}
            onKeyPress={handleNumericKeyPress}
            error={errors.cantidadDisponible}
            inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]" }}
            readOnly={!editMode}
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
            disabled={!editMode}
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
            readOnly={!editMode}
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
          {/* Botón de Aplicar */}
          <Controls.Button
            type="submit"
            text="Aplicar"
            disabled={applyButtonDisable}
            style={{ display: editMode ? "flex" : "none" }}
          />

          {/* Botón de Cancelar */}
          <Controls.Button
            text="Cancelar"
            color="inherit"
            onClick={() => {
              resetForm();
              handleCancelEditMode();
            }}
            style={{ display: editMode ? "flex" : "none" }}
          />

          {/* Botón de Editar */}
          <Controls.Button
            text="Editar"
            onClick={handleEnableEditMode}
            style={{ display: !editMode && hasEditRights() ? "flex" : "none" }}
            endIcon={<Edit />}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
