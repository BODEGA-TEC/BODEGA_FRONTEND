import { formatDate } from "../utils/functions";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getEstados as UtilsGetEstados,
} from "./UtilsService";

// Función para obtener estados y mapearlos
export async function getEstados(axiosInstance) {
  return UtilsGetEstados(axiosInstance, "componentes");
}

// Función para obtener categorías de componente y mapearlas
export async function getCategorias(axiosInstance) {
  const data = await getRequest(axiosInstance, "categorias/componentes");
  return (
    data?.map((categoria) => ({
      id: categoria.id.toString(),
      label: categoria.nombre,
    })) ?? []
  );
}

// Función para obtener los datos del componente
export async function getComponente(axiosInstance) {
  const data = await getRequest(axiosInstance, "componentes");
  return (
    data?.map((componente) => ({
      id: componente.id,
      activoBodega: componente.activoBodega,
      descripcion: componente.descripcion,
      noParte: componente.noParte,
      categoria: componente.categoria,
      estado: componente.estado,
      cantidadTotal: componente.cantidadTotal,
      cantidadDisponible: componente.cantidadDisponible,
      condicion: componente.condicion,
      estante: componente.estante,
      observaciones: componente.observaciones,
      fecha: formatDate(componente.fechaRegistro),
    })) ?? []
  );
}

// Función para agregar un nuevo componente
export async function postComponente(axiosInstance, componente) {
  try {
    return await postRequest(axiosInstance, "componentes", componente);
  } catch (error) {
    throw error;
  }
}

// Función para actualizar un componente utilizando PUT
export async function putComponente(axiosInstance, componenteId, componente) {
  try {
    return await putRequest(
      axiosInstance,
      `componentes/${componenteId}`,
      componente
    );
  } catch (error) {
    // Maneja errores
    throw error;
  }
}

// Función para eliminar un componente utilizando DELETE
export async function deleteComponente(axiosInstance, componenteId) {
  try {
    return await deleteRequest(axiosInstance, `componentes/${componenteId}`);
  } catch (error) {
    // Maneja errores
    throw error;
  }
}
