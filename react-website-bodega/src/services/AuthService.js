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
    throw error;
  }
}

// Function to handle user login
export async function login(credentials) {
  try {
    const { data } = await postRequest(LOGIN_ENDPOINT, credentials);
    return data;
  } catch (response) {
    if (!response?.data) {
      console.log(response);
      throw response.data.message;
    }
  }
}
