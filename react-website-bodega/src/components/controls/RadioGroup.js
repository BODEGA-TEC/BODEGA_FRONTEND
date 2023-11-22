import React from "react";
import { RadioGroup as MuiRadioGroup, Radio, Tooltip } from "@mui/material";
import { FormControl, FormLabel, FormControlLabel } from "@mui/material";
import { defaultPalette } from "../../config";

export default function RadioGroup(props) {
  const {
    name,
    label,
    value,
    variant,
    color,
    size,
    items,
    disabled = false,
    ...other
  } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <MuiRadioGroup
        row
        name={name}
        value={value}
        onChange={props.onChange}
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
                  color={color || defaultPalette}
                  size={size || "medium"}
                  disabled={disabled}
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
