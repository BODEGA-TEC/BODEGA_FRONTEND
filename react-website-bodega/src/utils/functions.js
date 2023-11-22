import JsBarcode from "jsbarcode";

// Función para manejar la entrada de teclas, asegurándose de que solo sean números
export const handleNumericKeyPress = (e) => {
  const keyCode = e.keyCode || e.which;
  const keyValue = String.fromCharCode(keyCode);
  if (!/^\d*$/.test(keyValue)) e.preventDefault();
};

// Función para generar y descargar una imagen de codigo de barras
export const generateBarcode = (code) => {
  try {
    // Crear un elemento canvas para el código de barras
    const canvas = document.createElement("canvas");

    // Generar el código de barras en el canvas
    JsBarcode(canvas, code, {
      format: "CODE128",
      displayValue: true,
      text: `SIBE — ${code}`,
    });
    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `barcode_${code}.png`;

    // Simular el clic en el enlace para descargar la imagen
    link.click();
  } catch (error) {
    console.error("Error al generar el código de barras:", error);
  }
};

// Funcion para parsear la fecha
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};