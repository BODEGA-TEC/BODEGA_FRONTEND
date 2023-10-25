import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as EquipoService from "../../services/EquipoService";
import { condicionItems } from "../../utils/constants";

const initialFValues = {
  id: 0,
  categoriaId: "",
  estadoId: "",
  condicion: condicionItems[0].label,
  descripcion: "",
  activoTec: "",
  marca: "",
  modelo: "",
  estante: "",
  serie: "",
  observaciones: "",
};

export default function EquipoForm(props) {
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
    if ("descripcion" in fieldValues)
      temp.descripcion = fieldValues.descripcion
        ? ""
        : "La descripción es requerida.";

    // Validar activoTec
    if ("activoTec" in fieldValues)
      temp.activoTec = fieldValues.activoTec
        ? ""
        : "El activo TEC es requerido.";

    // Validar estante
    if ("estante" in fieldValues)
      temp.estante = fieldValues.estante ? "" : "El estante es requerido.";

    setErrors({ ...temp });

    // Comprobar si todos los errores están vacíos
    return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  useEffect(() => {
    // Recuperar las categorías
    EquipoService.getCategoriasEquipo()
      .then((categoriasData) => {
        setCategorias(categoriasData);
      })
      .catch((error) => {
        console.error("Error al parsear categorías:", error);
      });

    // Recuperar los estados
    EquipoService.getEstados()
      .then((estadosData) => {
        setEstados(estadosData);
        setEstado(estadosData[0].label); // Establecer valor por defecto
      })
      .catch((error) => {
        console.error("Error al parsear estados:", error);
      });
  }, []);

  // Evento de finalizar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      postEquipo(values);
    }
  };

  // Función para restablecer los valores
  const resetStateValues = () => {
    setEstado(estados[0].label);
    setCategoria("");
  };

  // Envia el equipo al api
  const postEquipo = (equipo) => {
    // Llama a la función del servicio para agregar un nuevo activo
    EquipoService.postEquipo(equipo)
      .then((data) => {
        if (data.success) {
          // Si la solicitud fue exitosa, muestra la alerta de éxito
          setAlertMessage("Activo añadido correctamente");
          setAlertVisible(true);

          // Recarga la página después de un breve retraso (valor de tiempo en milisegundos)
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // Si hubo un error en el servidor, muestra la alerta de error
          // console.log(JSON.stringify(equipo));
          // console.log(data);
          setAlertMessage("Error al agregar el activo");
          setAlertVisible(true);
        }
      })
      .catch((error) => {
        console.error("Error al agregar el activo:", error);
      });
  };

  // Manejador de evento para select
  const handleSelectChange = (setter, options) => (e) => {
    const { name, value } = e.target;

    // Settear elemento seleccionado
    const selectedItem = options.find((item) => item.label === value);
    setter(selectedItem ? selectedItem.label : "");

    // Crea un evento sintético con el id correcto
    const syntheticEvent = {
      target: {
        name: name,
        value: selectedItem ? selectedItem.id : "",
      },
    };

    // Llama al manejador de eventos original con el evento sintético
    handleInputChange(syntheticEvent);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container justifyContent="center" alignItems="center" spacing={1.5}>
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
          {/* Marca */}
          <Controls.Input
            name="marca"
            label="Marca"
            value={values.marca}
            onChange={handleInputChange}
            error={errors.marca}
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

          {/* Activo TEC */}
          <Controls.Input
            name="activoTec"
            label="# Activo TEC"
            value={values.activoTec}
            onChange={handleInputChange}
            error={errors.activoTec}
          />

          {/* Serie */}
          <Controls.Input
            name="serie"
            label="# Serie"
            value={values.serie}
            onChange={handleInputChange}
            error={errors.serie}
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
            items={condicionItems}
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
