import React from "react";
import TextField from "@mui/material/TextField";

export default function Input(props) {
  const {
    name,
    label,
    value,
    variant,
    onChange,
    placeholder,
    required,
    error = null,
    readOnly = false,
    ...other
  } = props;

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      variant={variant || "outlined"}
      onChange={onChange}
      placeholder={placeholder || ""}
      required={required || false}
      InputProps={{ readOnly }}
      {...other}
      error={error ? true : false}
      helperText={error || ""}
    />
  );
}
