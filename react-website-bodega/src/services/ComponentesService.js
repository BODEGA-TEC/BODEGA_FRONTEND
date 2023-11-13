import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  formatDate,
  getEstados as UtilsGetEstados,
} from "./UtilsService";

// Función para obtener estados y mapearlos
export async function getEstados() {
  return UtilsGetEstados("componentes");
}

// Función para obtener categorías de componente y mapearlas
export async function getCategorias() {
  const data = await getRequest("categorias/componentes");
  return data.map((categoria) => ({
    id: categoria.id.toString(),
    label: categoria.nombre,
  }));
}

// Función para obtener los datos del componente
export async function getComponente() {
  const data = await getRequest("componentes");
  // Debe mpearse igual al json recibido
  return data.map((componente) => ({
    id: componente.id,
    categoria: componente.categoria,
    estado: componente.estado,
    descripcion: componente.descripcion,
    marca: componente.marca,
    modelo: componente.modelo,
    activoTec: componente.activoTec,
    serie: componente.serie,
    fecha: formatDate(componente.fechaRegistro),
    observaciones: componente.observaciones,
    estante: componente.estante,
    condicion: componente.condicion,
    activoBodega: componente.activoBodega,
  }));
}

// Función para agregar un nuevo componente
export async function postComponente(componente) {
  try {
    return await postRequest("componentes", componente);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un componente utilizando PUT
export async function putComponente(componenteId, componente) {
  try {
    return await putRequest(`componentes/${componenteId}`, componente);
  } catch (error) {
    // Maneja errores
    // console.error(error);
    throw error;
  }
}

// Función para eliminar un componente utilizando DELETE
export async function deleteComponente(componenteId) {
  try {
    return await deleteRequest(`componentes/${componenteId}`);
  } catch (error) {
    // Maneja errores
    // console.error(error);
    throw error;
  }
}
