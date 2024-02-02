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
  return UtilsGetEstados(axiosInstance, "equipo");
}

// Función para obtener categorías de equipo y mapearlas
export async function getCategorias(axiosInstance) {
  const data = await getRequest(axiosInstance, "categorias/equipo");
  return (
    data?.map((categoria) => ({
      id: categoria.id.toString(),
      label: categoria.nombre,
    })) ?? []
  );
}

// Función para obtener los datos del equipo
export async function getEquipo(axiosInstance) {
  const data = await getRequest(axiosInstance, "equipo");
  return (
    data?.map((equipo) => ({
      id: equipo.id,
      categoria: equipo.categoria,
      estado: equipo.estado,
      descripcion: equipo.descripcion,
      marca: equipo.marca,
      modelo: equipo.modelo,
      activoTec: equipo.activoTec,
      serie: equipo.serie,
      fecha: formatDate(equipo.fechaRegistro),
      observaciones: equipo.observaciones,
      estante: equipo.estante,
      condicion: equipo.condicion,
      activoBodega: equipo.activoBodega,
    })) ?? []
  );
}

// Función para agregar un nuevo equipo
export async function postEquipo(axiosInstance, equipo) {
  try {
    return await postRequest(axiosInstance, "equipo", equipo);
  } catch (error) {
    // Maneja errores
    console.error("Servidor desconectado");
    //throw error;
  }
}

// Función para actualizar un equipo utilizando PUT
export async function putEquipo(axiosInstance, equipoId, equipo) {
  try {
    return await putRequest(axiosInstance, `equipo/${equipoId}`, equipo);
  } catch (error) {
    // Maneja errores
    console.error("Servidor desconectado");
    //throw error;
  }
}

// Función para eliminar un equipo utilizando DELETE
export async function deleteEquipo(axiosInstance, equipoId) {
  try {
    return await deleteRequest(axiosInstance, `equipo/${equipoId}`);
  } catch (error) {
    // Maneja errores
    console.error("Servidor desconectado");
    //throw error;
  }
}
