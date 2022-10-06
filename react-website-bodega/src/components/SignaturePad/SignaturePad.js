import React, { useEffect, useState, useRef } from "react";
import "./SignaturePad.css";
import { Button, Container, Grid} from "@mui/material";
import ReactSignatureCanvas from "react-signature-canvas";

const SignaturePad = (props) => {

  const { title, setSignature } = props;

  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setHeight(ref.current.offsetHeight);
    setWidth(ref.current.offsetWidth);
    // 👇️ if you need access to parent
    // of the element on which you set the ref
    console.log(ref.current.parentElement);
    console.log(ref.current.parentElement.offsetHeight);
    console.log(ref.current.parentElement.offsetWidth);
  }, []);

  let sigPad = useRef({});

  const save=()=>{
    setSignature(sigPad.current.toDataURL());
    console.log(sigPad.current.toDataURL())
  }

  const clear=()=>{
    sigPad.current.clear();
  }

  return (
    <Container sx={{ marginTop: '2%', marginBottom: '3%' }}>
      <p>{title}</p>

      <Grid sx={{marginTop: '1%' }} container spacing={2}>
        <Grid item xs={12} md={12}>
            <Button sx={{marginRight: '1%' }} variant="outlined" size="small" onClick={clear}>Borrar</Button>
            <Button  variant="contained" size="small" onClick={save}>Guardar</Button>
        </Grid>

        <Grid ref={ref} item xs={12} md={12}>
          <ReactSignatureCanvas
            penColor="black"
            ref={sigPad}
            canvasProps={{ width: { width }, height: { height }, className: "sigCanvas" }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignaturePad