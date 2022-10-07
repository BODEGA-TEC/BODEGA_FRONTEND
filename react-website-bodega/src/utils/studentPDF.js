const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
// const { degrees, PDFDocument, rgb, StandardFonts } = PDFlib;

async function pdfGenerator(props) {
  const {
    Nombre,
    PrimerApellido,
    SegundoApellido,
    Carnet,
    Curso,
    Signature,
    Equipo,
    Fecha
  } = props
  console.log(props)
  // Fetch an existing PDF document
  const url = "boleta_estudiantes.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Prepara la imagen de la firma
  const pngImageBytes = await fetch(Signature).then((res) => res.arrayBuffer());
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const pngDims = pngImage.scale(0.5);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Dibuja el primer apellido
  firstPage.drawText(PrimerApellido.value, {
      x: 55,
      y: 630,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0.8),
  });

  // Dibuja el segundo apellido
  firstPage.drawText(SegundoApellido.value, {
      x: 220,
      y: 630,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0.8),
  });

  // Dibuja el nombre
  firstPage.drawText(Nombre.value, {
      x: 388,
      y: 630,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0.8),
  });

  // Dibuja el nombre
  firstPage.drawText(Carnet.value, {
    x: 55,
    y: 598,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0.8),
  });
  
  // Dibuja el nombre
  firstPage.drawText(Curso.value, {
    x: 220,
    y: 598,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0.8),
  });
    
  
    // Dibuja el nombre
  firstPage.drawText(Fecha.value, {
    x: 388,
    y: 598,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0.8),
  });

  // Dibuja la imagen de la firma
  firstPage.drawImage(Signature, {
    x: 120,
    y: 150,
    width: pngDims.width,
    height: pngDims.height,
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Trigger the browser to download the PDF document
  // PDFDocument.download(pdfBytes, "boleta-estudiate-" + PrimerApellido.value + "-" + SegundoApellido.value + "-" + Nombre.value +".pdf", "application/pdf");
}

module.exports = {
  pdfGenerator
}