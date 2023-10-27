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

const PopupTitle = styled(DialogTitle)(({ palette }) => ({
  background: `linear-gradient(to top, ${palette.start || "#fff"}, ${
    palette.end || "#fff"
  })`,
  paddingRight: "5px",
  color: palette.textcolor || "text.primary",
}));

const Popup = ({
  title,
  width,
  children,
  openPopup,
  setOpenPopup,
  palette,
}) => {
  return (
    <Dialog open={openPopup} maxWidth={width || "md"} sx={styles.dialogWrapper}>
      <PopupTitle palette={palette}>
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
