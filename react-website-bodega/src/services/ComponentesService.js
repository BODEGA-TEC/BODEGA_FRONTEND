import { formatDate } from "../utils/functions";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getEstados as UtilsGetEstados,
} from "./UtilsService";

// Función para obtener estados y mapearlos
export async function getEstados() {
  return UtilsGetEstados("componentes");
}

// Función para obtener categorías de componente y mapearlas
export async function getCategorias() {
  const data = await getRequest("categorias/componentes");
  return (
    data?.map((categoria) => ({
      id: categoria.id.toString(),
      label: categoria.nombre,
    })) ?? []
  );
}

// Función para obtener los datos del componente
export async function getComponente() {
  const data = await getRequest("componentes");
  return (
    data?.map((componente) => ({
      id: componente.id,
      activoBodega: componente.activoBodega,
      descripcion: componente.descripcion,
      modelo: componente.modelo,
      categoria: componente.categoria,
      estado: componente.estado,
      cantidad: componente.cantidad,
      condicion: componente.condicion,
      estante: componente.estante,
      observaciones: componente.observaciones,
      fecha: formatDate(componente.fechaRegistro),
    })) ?? []
  );
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
