// const courses =
//   ['Laboratorio de Circuitos Eléctricos',
//     'Laboratorio de Elementos Activos',
//     'Taller de Diseño Digital',
//     'Taller de Diseño Analógico',
//     'Diseño Lógico'
//   ];

const maxLength = 30;
const studentsForm = {
  title : "Solicitud de Componentes y Equipo para Estudiantes",
  description : "El siguiente formulario está diseñado con el objetivo de que la comunidad estudiantil pueda generar una solicitud de componentes o equipos al departamento de Bodega de la Escuela de Ingeniería Electrónica.",
  form : {
    Nombre: {
      placeholder: "Nombre",
      type: "text",
      defaultValue: "",
      htmlAttributes: { maxlength: maxLength },
      rules: {
        required: true,
      },
    },
    PrimerApellido: {
      placeholder: "Primer Apellido",
      type: "text",
      htmlAttributes: { maxlength: maxLength },
      defaultValue: "",
      rules: {
        required: true,
      },
    },
    SegundoApellido: {
      placeholder: "Segundo Apellido",
      type: "text",
      htmlAttributes: { maxlength: maxLength },
      defaultValue: "",
      rules: {
        required: true,
      },
    },

    Carnet: {
      placeholder: "Carné",
      type: "number",
      htmlAttributes: { maxlength: 10 },
      defaultValue: "",
      rules: {
        required: true,
      },
    },

    Curso: {
      placeholder: "Curso",
      type: "text",
      htmlAttributes: { maxlength: maxLength },
      defaultValue: "",
      rules: {
        required: true
      },
    }
  }
};

module.exports = {
  studentsForm
}