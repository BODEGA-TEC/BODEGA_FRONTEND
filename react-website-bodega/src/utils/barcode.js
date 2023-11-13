import JsBarcode from "jsbarcode";

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
