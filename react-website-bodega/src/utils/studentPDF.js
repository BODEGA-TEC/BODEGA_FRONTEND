import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import downloadjs from "downloadjs";
import url from "./boletasTemplate/boleta_estudiantes.pdf";

async function createPDF(props) {
  const {
    Nombre,
    PrimerApellido,
    SegundoApellido,
    Carnet,
    Turno,
    AsistenteEntrega,
    Firma,
    Componentes,
    Fecha,
    scale,
  } = props;

  // Fetch an existing PDF document
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Prepara la imagen de la firma
  const pngImageBytes = await fetch(Firma).then((res) => res.arrayBuffer());
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const pngDims = pngImage.scale(scale);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const page = pages[0];

  // Dibujar
  const specs = { size: 11, font: font, color: rgb(0, 0, 0.8) };

  page.drawText(Nombre + " " + PrimerApellido + " " + SegundoApellido, {
    x: 85,
    y: 625,
    ...specs,
  });
  page.drawText(String(Carnet), { x: 355, y: 625, ...specs });
  page.drawText(Turno, { x: 355, y: 400, ...specs });
  page.drawText(Fecha, { x: 445, y: 400, ...specs });
  page.drawText(AsistenteEntrega, { x: 85, y: 400, ...specs });

  page.drawImage(pngImage, {
    x: 440 - pngDims.width / 2,
    y: 260,
    width: pngDims.width,
    height: pngDims.height,
  });

  // Dibujar los componentes
  Componentes.forEach(drawComponent);
  function drawComponent(value, index) {
    const { Descripcion, Activo, Serie, Cantidad } = value;

    const y = 590 - 20 * index;
    page.drawText(String(Cantidad), { x: 85, y: y, ...specs });
    page.drawText(Descripcion, { x: 120, y: y, ...specs });
    page.drawText(String(Activo), { x: 355, y: y, ...specs });
    page.drawText(String(Serie), { x: 445, y: y, ...specs });
  }

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Trigger the browser to download the PDF document
  downloadjs(
    pdfBytes,
    "boleta-estudiate-" +
      PrimerApellido +
      "-" +
      SegundoApellido +
      "-" +
      Nombre +
      ".pdf",
    "application/pdf"
  );
}

export default createPDF;
