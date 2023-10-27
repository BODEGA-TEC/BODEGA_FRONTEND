import { get, post, put, formatDate } from "./UtilsService";

// Función para obtener categorías de equipo y mapearlas
export async function getCategoriasEquipo() {
  const data = await get("categorias/equipo");
  return data.map((categoria) => ({
    id: categoria.id.toString(),
    label: categoria.nombre,
  }));
}

// Función para obtener los datos del equipo
export async function getEquipo() {
  const data = await get("equipo");
  // Debe mpearse igual al json recibido
  return data.map((equipo) => ({
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
  }));
}

// Función para agregar un nuevo equipo
export async function postEquipo(equipo) {
  try {
    return await post("equipo", equipo);
  } catch (error) {
    // console.error(error);
    throw error;
  }
}

// Función para actualizar un equipo utilizando PUT
export async function putEquipo(equipoId, equipo) {
  try {
    return await put(`equipo/${equipoId}`, equipo);
  } catch (error) {
    // Maneja errores
    // console.error(error);
    throw error;
  }
}

// Reexporta getEstados desde UtilsService
export { getEstados } from "./UtilsService";
