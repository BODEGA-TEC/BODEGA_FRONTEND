import { postRequest } from "./UtilsService";

// Endpoint constants
const REGISTER_ENDPOINT = "/register";
const LOGIN_ENDPOINT = "/login";

// Function to handle user registration
export async function register(userInfo) {
  try {
    const response = await postRequest(REGISTER_ENDPOINT, userInfo);

    // Assuming the response has { status, message, data }
    const { status, message } = response?.data;

    if (status) {
      // Registration successful
      return { success: true };
    } else {
      // Registration failed, treat 'message' as an error
      throw new Error(message || "Registration failed");
    }
  } catch (error) {
    throw handleError(error);
  }
}

// Function to handle user login
export async function login(credentials) {
  try {
    const { data } = await postRequest(LOGIN_ENDPOINT, credentials);
    const { user, roles, token } = data;
    console.log(data);

    return { user, roles, token };
  } catch (error) {
    throw handleError(error);
  }
}

function handleError(err) {
  if (!err?.response) {
    return "Sin respuesta del servidor";
  } else if (err.response?.status === 403) {
    return "Acción prohibida";
  } else if (err.response?.status === 401) {
    return "Acción no autorizada";
  } else {
    return "Error de inicio de sesión/registro";
  }
}
