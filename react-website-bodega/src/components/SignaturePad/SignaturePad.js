import React, { useEffect, useState, useRef } from "react";
import "./SignaturePad.css";
import { Button, Container, Grid } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = (props) => {
  const { title, setSignature } = props;
  const signaturePadRef = useRef(); // referencia para el tamaño del pad

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(signaturePadRef.current.offsetWidth * 0.9);
  }, []);

  let sigPad = useRef({});

  const save = () => {
    setSignature(sigPad.current.toDataURL());
    // console.log(sigPad.current.toDataURL());
  };

  const clear = () => {
    sigPad.current.clear();
  };

  return (
    <Container sx={{ marginTop: "3%", marginBottom: "3%" }}>

      <Grid container>
        <Grid item> <p>{title}</p> </Grid>
      </Grid>

      <Grid container sx={{ marginBottom: "1.5%" }} columnSpacing={1} justifyContent="flex-end">
        <Grid item>
          <Button variant="outlined" size="small" onClick={clear}> Borrar </Button>
        </Grid>

        <Grid item>
          <Button variant="contained" size="small" onClick={save}> Guardar </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid
          ref={signaturePadRef}
          item
          xs={12}
          md={12}
          justifyContent="center"
          align="center"
        >
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{
              width: width,
              height: width*0.6,
              className: "sigCanvas",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignaturePad;
