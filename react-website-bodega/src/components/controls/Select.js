import React from "react";
import { Select as MuiSelect, Tooltip } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function Select(props) {
  const {
    name,
    label,
    value,
    variant,
    error = null,
    onChange,
    options,
    readOnly = false,
  } = props;

  const inputProps = {
    ...props.inputProps,
    readOnly,
  };

  // Ajusta IconComponent solo cuando readOnly es true
  if (readOnly) {
    inputProps.IconComponent = () => null;
  }

  return (
    <FormControl variant={variant || "outlined"} error={Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        renderValue={(selected) => selected}
        inputProps={inputProps}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.label}>
            <Tooltip title={item.description}>
              <span>{item.label}</span>
            </Tooltip>
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
