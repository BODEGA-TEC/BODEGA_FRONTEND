import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import downloadjs from "downloadjs";
import url from "./boletasTemplate/boleta_estudiantes.pdf";

async function createPDF(props) {
  const {
    Nombre,
    PrimerApellido,
    SegundoApellido,
    Carnet,
    Turno2,
    AsistenteEntrega,
    Firma,
    Componentes,
    Fecha2,
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
    y: 605,
    ...specs,
  });
  page.drawText(String(Carnet), { x: 355, y: 605, ...specs });
  page.drawText(Turno, { x: 355, y: 320, ...specs });
  page.drawText(Fecha, { x: 445, y: 320, ...specs });
  page.drawText(AsistenteEntrega, { x: 85, y: 374, ...specs });

  page.drawImage(pngImage, {
    x: 430 - pngDims.width / 2,
    y: 230,
    width: pngDims.width,
    height: pngDims.height,
  });

  // Dibujar los componentes
  Componentes.forEach(drawComponent);
  function drawComponent(value, index) {
    const { itemName, quantity } = value;

    const y = 565 - 20 * index;
    page.drawText(String(quantity), { x: 85, y: y, ...specs });
    page.drawText(itemName, { x: 135, y: y, ...specs });
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
