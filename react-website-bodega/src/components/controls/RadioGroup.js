import React from "react";
import { RadioGroup as MuiRadioGroup, Radio, Tooltip } from "@mui/material";
import { FormControl, FormLabel, FormControlLabel } from "@mui/material";

export default function RadioGroup(props) {
  const {
    name,
    label,
    value,
    onChange,
    variant,
    color,
    size,
    items,
    ...other
  } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <MuiRadioGroup
        row
        name={name}
        value={value}
        onChange={onChange}
        sx={{ marginLeft: "1.5%" }}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.label}
            control={
              <Tooltip title={item.description}>
                <Radio
                  variant={variant || "outlined"}
                  color={color || "secondary"}
                  size={size || "medium"}
                  {...other}
                />
              </Tooltip>
            }
            label={item.label}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
