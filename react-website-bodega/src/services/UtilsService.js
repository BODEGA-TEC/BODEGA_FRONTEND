import axios from "./api";

export function handleError(error) {
  if (!error?.response) {
    console.error("Sin respuesta del servidor");
    console.error(error);
    return null;
  } else {
    throw error.response?.data?.message;
  }
}

// Función genérica para hacer solicitudes GET a la API
export async function getRequest(axiosInstance, endpoint) {
  try {
    const response = await axiosInstance.get(endpoint);
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
export async function postRequest(axiosInstance, endpoint, data) {
  try {
    const response = await axiosInstance.post(endpoint, data);
    const serviceResponse = response.data;
    // console.log("Respuesta POST ", serviceResponse);

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
export async function putRequest(axiosInstance, endpoint, data) {
  try {
    const response = await axiosInstance.put(endpoint, data);
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
export async function deleteRequest(axiosInstance, endpoint) {
  try {
    const response = await axiosInstance.delete(endpoint);
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
export async function getEstados(axiosInstance, tipoActivo) {
  const data = await getRequest(axiosInstance, `estados/${tipoActivo}`);
  return (
    data?.map((estado) => ({
      id: estado.id.toString(),
      label: estado.nombre,
      description: estado.descripcion,
    })) ?? []
  );
}
