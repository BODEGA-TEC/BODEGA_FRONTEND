import { postRequest } from "./UtilsService";

//const axiosPrivate = useAxiosPrivate();

// Endpoint constants
const REGISTER_ENDPOINT = "/register";
const LOGIN_ENDPOINT = "/login";

// Function to handle user registration
export async function register(axiosInstance, userInfo) {
  try {
    const response = await postRequest(axiosInstance, REGISTER_ENDPOINT, userInfo);

    // Assuming the response has { status, message, data }
    const { success, message } = response;

    if (success) {
      // Registration successful
      return { success: true, message: message };
    } else {
      // Registration failed, treat 'message' as an error
      return { success: false, message: message || "Registration failed"};
    }
  } catch (error) {
    throw error;
  }
}

// Function to handle user login
export async function login(axiosInstance, credentials) {
  try {
    //console.log(credentials);
    const response = await postRequest(axiosInstance, LOGIN_ENDPOINT, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}
