import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import "../../App.css";
import Input from "./Input";

const courses = ['Laboratorio de Elementos Activos', 'Taller de Diseño Digital', 'Taller de Diseño Analógico'];
const studentsForm = {

  nombre: {
    label: "Nombre",
    type: "textfield",
    placeholder: "Ingrese su nombre",
    defaultValue: "",
    rules: {
      required: true,
    },
    
  },
  primerApellido: {
    label: "Primer Apellido",
    type: "textfield",
    placeholder: "Ingrese su primer apellido",
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  segundoApellido: {
    label: "Segundo Apellido",
    type: "textfield",
    placeholder: "Ingrese su segundo apellido",
    defaultValue: "",
    rules: {
      required: true,
    },
  },

  carnet: {
    label: "Carné",
    type: "textfield",
    placeholder: "Ingrese su número de carné",
    defaultValue: "",
    rules: {
      required: true,
    },
  },

  // gender: {
  //   label: "Gender",
  //   type: "radio",
  //   options: ["male", "female"],
  //   defaultValue: "",
  //   rules: {
  //     required: true,
  //   },
  // },
  curso: {
    label: "Curso",
    type: "select",
    options: courses,
    defaultValue: "",
    rules: {
      required: true,
    },
  }
};

//Error Component
const Error = ({ children }) => <p style={{ color: "red" }}>{children}</p>;

const DynamicForm = () => {

  // const navigate = useNavigate();
  //   const navigateToForm1 = () => {
  //     navigate('/forms-1');
  // }; 
  
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {}
  });

  const formInputs = Object.keys(studentsForm).map((e) => {
    const { rules, defaultValue, label } = studentsForm[e];

    return (
      <section key={e}>
        <label>{label}</label>
        <Controller
          name={e}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div>
              <Input
                value={field.value}
                onChange={field.onChange}
                {...studentsForm[e]}
              />
            </div>
          )}
        />
        {errors[e] && <Error>Espacio requerido</Error>}
      </section>
    );
  });

  const onSubmit = (data) => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <h2>Solicitud de componentes y equipo para estudiantes</h2>
      <p>El siguiente formulario esta diseñado con el objetivo de que la comunidad estudiantil pueda generar una solicitud de componentes o equipos al departamento de Bodega de la Escuela de Ingeniería Electrónica. Por lo cual, se solicita la adecuada revisión antes de enviarlo para minimizar los errores y problemas en el proceso de solicitud.</p>
      
      {/* <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large' onClick={navigateToForm1}>
        Estudiantes
      </Button> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs}
        <div style={{ textAlign: "center" }}>
          <Button type="submit" cssClass="e-success">
            Success
          </Button>
        </div>
      </form>
    </div>
    

  //   <div className="wrapper">
      
  //     <Link to="/normal">
  //       <ButtonComponent cssClass="e-success">Go to Normal</ButtonComponent>
  //     </Link>

  //   </div>
  );
};
  

export default DynamicForm;