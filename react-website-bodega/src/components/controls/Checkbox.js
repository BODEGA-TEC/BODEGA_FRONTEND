import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material/";
import { theme } from "../../config";

export default function Checkbox(props) {
  const { name, label, value, color, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color={color || theme}
            size="medium"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
