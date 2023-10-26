import React from "react";
import { Button as MuiButton } from "@mui/material/";
import { styled } from "@mui/system";
import { theme } from "../../config";

// https://mui.com/material-ui/react-button/
// https://mui.com/material-ui/api/button/

const StyledButton = styled(MuiButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
  textTransform: "none",
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props;

  return (
    <StyledButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || theme}
      onClick={onClick}
      {...other}
    >
      {text}
    </StyledButton>
  );
}
