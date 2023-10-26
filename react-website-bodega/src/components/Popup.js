import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const styles = {
  dialogWrapper: {
    padding: "2rem",
    position: "absolute",
    top: "5rem",
  },
};

const PopupTitle = styled(DialogTitle)(
  ({ textcolor, gradientcolor1, gradientcolor2 }) => ({
    background: `linear-gradient(to top, ${gradientcolor1 || "#fff"}, ${
      gradientcolor2 || "#fff"
    })`,
    paddingRight: "5px",
    color: textcolor || "text.primary",
  })
);

const Popup = ({
  title,
  width,
  children,
  openPopup,
  setOpenPopup,
  textcolor,
  gradientcolor1,
  gradientcolor2,
}) => {
  return (
    <Dialog open={openPopup} maxWidth={width || "md"} sx={styles.dialogWrapper}>
      <PopupTitle
        textcolor={textcolor}
        gradientcolor1={gradientcolor1}
        gradientcolor2={gradientcolor2}
      >
        <div style={{ display: "flex" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            {title}
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenPopup(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </PopupTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
