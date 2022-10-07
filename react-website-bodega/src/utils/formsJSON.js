const courses =
  ['Laboratorio de Circuitos Eléctricos',
    'Laboratorio de Elementos Activos',
    'Taller de Diseño Digital',
    'Taller de Diseño Analógico',
    'Diseño Lógico'
  ];

const maxLength = 30;
const studentsForm = {
  Nombre: {
    placeholder: "Nombre",
    type: "text",
    defaultValue: "",
    htmlAttributes:{maxlength:maxLength},
    rules: {
      required: true,
    },
    
  },
  PrimerApellido: {
    placeholder: "Primer Apellido",
    type: "text",
    htmlAttributes:{maxlength:maxLength},
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  SegundoApellido: {
    placeholder: "Segundo Apellido",
    type: "text",
    htmlAttributes:{maxlength:maxLength},
    defaultValue: "",
    rules: {
      required: true,
    },
  },

  Carnet: {
    placeholder: "Carné",
    type: "number",
    htmlAttributes:{maxlength:10},
    defaultValue: "",
    rules: {
      required: true,
    },
  },

  Curso: {
    placeholder: "Curso",
    type: "text",
    htmlAttributes:{maxlength:maxLength},
    defaultValue: "",
    rules: {
      required: true
    },
  }
};


module.exports = {
  studentsForm
}