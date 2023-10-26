import * as React from "react";
import { styled } from "@mui/system";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = React.useState(initialFValues);
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

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

const FormRoot = styled("form")(() => ({
  "& .MuiFormControl-root": {
    width: "100%",
    margin: "1.2% auto",
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
