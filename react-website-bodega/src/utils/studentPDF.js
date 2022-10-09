import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import downloadjs from 'downloadjs';
import url from './boletasTemplate/boleta_estudiantes.pdf';

async function createPDF(props) {
  const {
    Nombre,
    PrimerApellido,
    SegundoApellido,
    Carnet,
    Curso,
    Firma,
    Componentes,
    Fecha,
  } = props;

  console.log(Nombre, PrimerApellido, SegundoApellido, Carnet, Curso, Fecha, Firma, Componentes);

  // Fetch an existing PDF document
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Prepara la imagen de la firma
  const pngImageBytes = await fetch(Firma).then((res) => res.arrayBuffer());
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const pngDims = pngImage.scale(0.5);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const page = pages[0];

  // Dibujar
  page.drawText(PrimerApellido, { x: 55, y: 630, size: 12, font: font, color: rgb(0, 0, 0.8) });
  page.drawText(SegundoApellido, { x: 220, y: 630, size: 12, font: font, color: rgb(0, 0, 0.8)});
  page.drawText(Nombre, { x: 388, y: 630, size: 12, font: font, color: rgb(0, 0, 0.8) });
  page.drawText(String(Carnet), { x: 55, y: 598, size: 12, font: font, color: rgb(0, 0, 0.8) });
  page.drawText(Curso, { x: 220, y: 598, size: 12, font: font, color: rgb(0, 0, 0.8) });
  page.drawText(Fecha, { x: 388, y: 598, size: 12, font: font, color: rgb(0, 0, 0.8) });
  page.drawImage(pngImage, { x: 120, y: 150, width: pngDims.width, height: pngDims.height});

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Trigger the browser to download the PDF document
  downloadjs(pdfBytes, "boleta-estudiate-" + PrimerApellido.value + "-" + SegundoApellido.value + "-" + Nombre.value +".pdf", "application/pdf");
}

export default createPDF;