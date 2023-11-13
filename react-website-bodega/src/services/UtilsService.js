import { host } from "../config";

// Función genérica para hacer solicitudes GET a la API
export async function getRequest(endpoint) {
  try {
    const response = await fetch(`${host}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`error al obtener datos desde ${endpoint}`);
    }

    const serviceResponse = await response.json();
    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }

    return serviceResponse.data;
  } catch (error) {
    // Maneja errores
    throw error;
  }
}

// Función genérica para realizar una solicitud POST a la API
export async function postRequest(endpoint, data) {
  try {
    const response = await fetch(`${host}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const serviceResponse = await response.json();
    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }
    return serviceResponse;
  } catch (error) {
    // Maneja errores
    throw error;
  }
}

// Función genérica para realizar una solicitud PUT a la API
export async function putRequest(endpoint, data) {
  try {
    const response = await fetch(`${host}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const serviceResponse = await response.json();
    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }
    return serviceResponse;
  } catch (error) {
    // Maneja errores
    throw error;
  }
}

// Función genérica para realizar una solicitud DELETE a la API
export async function deleteRequest(endpoint) {
  try {
    const response = await fetch(`${host}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const serviceResponse = await response.json();
    if (!serviceResponse.success) {
      throw new Error(`${serviceResponse.message}`);
    }
    return serviceResponse;
  } catch (error) {
    // Maneja errores
    throw error;
  }
}

// Función para obtener estados y mapearlos
export async function getEstados(tipoActivo) {
  const data = await getRequest("estados/"+tipoActivo);
  return data.map((estado) => ({
    id: estado.id.toString(),
    label: estado.nombre,
    description: estado.descripcion,
  }));
}

// Funcion para parsear la fecha
export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
