import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import "../../App.css";
import "./ComponentsForm.css";

const ComponentsForm = (props) => {
  const { submitRef, setComponents } = props;

  const defaultValue = { Descripcion: "", Activo: "", Serie: "", Cantidad: "" };
  const [formFields, setFormFields] = useState([defaultValue]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    setFormFields([...formFields, defaultValue]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const submit = (e) => {
    // console.log(formFields);
    setComponents(formFields);
  };

  return (
    <Container sx={{ marginTop: "2%" }}>
      <Grid item xs={12} md={12} align="justify">
        <p>Ingrese los componentes que desea solicitar</p>
      </Grid>

      <Grid item xs={12} md={12} align="justify">
        <form onSubmit={submit}>
          {formFields.map((form, index) => {
            return (
              <div
                key={index}
                style={
                  {
                    backgroundColor: "ligthgray",
                  }
                }
              >
                <input
                  name="Descripcion"
                  placeholder="Descripcion"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.Descripcion}
                />
                <input
                  name="Activo"
                  placeholder="#Activo"
                  onChange={(event) => handleFormChange(event, index)}
                  style={{ width: "17%" }}
                  value={form.Activo}
                />
                <input
                  name="Serie"
                  placeholder="#Serie"
                  onChange={(event) => handleFormChange(event, index)}
                  style={{ width: "17%" }}
                  value={form.Serie}
                />
                <input
                  type="number"
                  name="Cantidad"
                  placeholder={"1"}
                  onChange={(event) => handleFormChange(event, index)}
                  min="1"
                  style={{ width: "8%" }}
                  value={form.Cantidad}
                />
                <span
                  className="item-remove"
                  onClick={() => removeFields(index)}
                >
                  <i className="fa fa-eraser"></i>
                </span>
              </div>
            );
          })}
        </form>
        <span className="item-remove" onClick={() => addFields()}>
          <i className="fa fa-plus"></i>{" "}
        </span>
        <br />
        <button
          ref={submitRef}
          type="submit"
          style={{ display: "none" }}
          onClick={submit}
        >
          Submit
        </button>
      </Grid>
    </Container>
  );
};

export default ComponentsForm;
