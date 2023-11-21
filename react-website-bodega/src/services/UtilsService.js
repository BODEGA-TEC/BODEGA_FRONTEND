import axios from "axios";
import { host } from "../config";

const API = axios.create({
  baseURL: host + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function handleError(err) {
  if (!err?.response) {
    console.error("Sin respuesta del servidor");
    return null;
  } else {
    throw err;
  }
}

// Función genérica para hacer solicitudes GET a la API
export async function getRequest(endpoint) {
  try {
    const response = await API.get(endpoint);
    const serviceResponse = response.data;

    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }

    return serviceResponse.data;
  } catch (error) {
    // Maneja errores
    throw handleError(error);
  }
}

// Función genérica para realizar una solicitud POST a la API
export async function postRequest(endpoint, data) {
  try {
    const response = await API.post(endpoint, data);
    const serviceResponse = response.data;

    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }

    return serviceResponse;
  } catch (error) {
    // Maneja errores
    throw handleError(error);
  }
}

// Función genérica para realizar una solicitud PUT a la API
export async function putRequest(endpoint, data) {
  try {
    const response = await API.put(endpoint, data);
    const serviceResponse = response.data;

    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }

    return serviceResponse;
  } catch (error) {
    // Maneja errores
    throw handleError(error);
  }
}

// Función genérica para realizar una solicitud DELETE a la API
export async function deleteRequest(endpoint) {
  try {
    const response = await API.delete(endpoint);
    const serviceResponse = response.data;

    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }

    return serviceResponse;
  } catch (error) {
    // Maneja errores
    throw handleError(error);
  }
}

// Función para obtener estados y mapearlos
export async function getEstados(tipoActivo) {
  const data = await getRequest(`estados/${tipoActivo}`);
  return (
    data?.map((estado) => ({
      id: estado.id.toString(),
      label: estado.nombre,
      description: estado.descripcion,
    })) ?? []
  );
}
