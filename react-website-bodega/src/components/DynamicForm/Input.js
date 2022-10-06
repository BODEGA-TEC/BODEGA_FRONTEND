import React from 'react'
import { TextField, Radio, Select, Checkbox, MenuItem } from "@mui/material";

const Input = ({ value, onChange, type, ...rest }) => {
  switch (type) {
    case "textfield":
      return (
        <TextField
          placeholder={rest?.placeholder}
          change={({ value }) => onChange(value)}
          value={value}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            style: {
              fontSize: 12
            }
          }}
          sx={{ width: '75%' }}
        />
      );
    case "radio":
      return rest?.options.map((e) => (
        <Radio
          key={e}
          // label={e}
          value={e}
          onChange={(value) => onChange(value)}
          checked={value === e}
        />
      ));
    case "select":
      return (
        <Select
          dataSource={rest?.options}
          onChange={(value) => onChange(value)}
        >
          {
            rest?.options.map((e, i) => {
              return (
                <MenuItem key={i} value={e}> {e}</MenuItem>
              )
            })
          }
        </Select>
      );

    case "checkbox":
      return (
        <Checkbox
          label={rest?.checkboxLabel}
          onChange={(e) => onChange(e.target.checked)}
          checked={value}
        />
      );

    default:
      return null;
  }
}

export default Input