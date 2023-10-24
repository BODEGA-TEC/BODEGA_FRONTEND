import React, { useEffect, useState, useRef } from "react";
import "./SignaturePad.css";
import { Button, Container, Grid } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = (props) => {
  const { title, setSignature } = props;

  const signatureGridRef = useRef(null); // referencia para el tamaño del pad
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  // function to set the canvas width of the signature pad.
  const handleWindowSizeChange = () => {
    const width = signatureGridRef.current.offsetWidth;
    let height = width * 0.5;
    if (width > 600) height = width * 0.38;
    setHeight(height);
    setWidth(width);
  };

  // call your useEffect to detect windows resized
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let sigPad = useRef({});

  const save = () => {
    setSignature(sigPad.current.toDataURL());
    clear();
  };

  const clear = () => {
    sigPad.current.clear();
  };

  return (
    <Container sx={{ marginTop: "3%", marginBottom: "3%" }}>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item>
            <p>{title}</p>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ marginBottom: "1.5%" }}
          columnSpacing={1}
          justifyContent="flex-end"
        >
          <Grid item>
            <Button
              style={{
                color: "#0c688d",
                border: "1px solid"
                }}
              variant="outlined" size="small" onClick={clear}>
              Borrar
            </Button>
          </Grid>

          <Grid item>
            <Button
              style={{ backgroundColor: "#0c688d"}}
              variant="contained"
              size="small"
              onClick={save}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid
            ref={signatureGridRef}
            item
            xs={12}
            md={12}
            justifyContent="center"
            align="center"
          >
            <SignatureCanvas
              ref={sigPad}
              penColor="blue"
              canvasProps={{
                width: width,
                height: height,
                className: "sigCanvas",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignaturePad;
