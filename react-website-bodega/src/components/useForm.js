import * as React from "react";
import { styled } from "@mui/system";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = React.useState(initialFValues);
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const FormRoot = styled("form")(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
    //margin: "0 auto",
    margin: theme.spacing(1),
  },
}));

export function Form(props) {
  const { children, ...other } = props;
  return (
    <FormRoot autoComplete="off" {...other}>
      {children}
    </FormRoot>
  );
}
