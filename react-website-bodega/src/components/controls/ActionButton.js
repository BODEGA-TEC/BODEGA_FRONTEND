import React from "react";
import { Button } from "@mui/material/";
import { styled } from "@mui/system";

const StyledActionButton = styled(Button)(({ theme, color }) => ({
  minWidth: 0,
  margin: theme.spacing(0.5),
  backgroundColor:
    color === "secondary"
      ? theme.palette.secondary.light
      : theme.palette.primary.light,
  "& .MuiButton-label": {
    color:
      color === "secondary"
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
}));

export default function ActionButton(props) {
  const { color, children, onClick } = props;

  return (
    <StyledActionButton color={color} onClick={onClick}>
      {children}
    </StyledActionButton>
  );
}
