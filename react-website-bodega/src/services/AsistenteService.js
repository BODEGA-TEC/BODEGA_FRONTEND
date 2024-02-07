import { postRequest } from "./UtilsService";

//const axiosPrivate = useAxiosPrivate();

// Endpoint constants
const REGISTER_MULTIPLE_ASISTENTES_ENDPOINT = "/asistentes/registrar";

// Function to handle multiple asistentes registration
export async function register(axiosInstance, asistentesInfo) {
  try {
    const response = await postRequest(
      axiosInstance,
      REGISTER_MULTIPLE_ASISTENTES_ENDPOINT,
      asistentesInfo
    );

    // Assuming the response has { status, message, data }
    const { success, message } = response;

    if (success) {
      // Registration successful
      return { success: true, message: message };
    } else {
      // Registration failed, treat 'message' as an error
      return { success: false, message: message || "Registration failed" };
    }
  } catch (error) {
    throw error;
  }
}
