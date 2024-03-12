import { postRequest } from "./UtilsService";

//const axiosPrivate = useAxiosPrivate();

// Endpoint constants
const REGISTER_ENDPOINT = "/register";
const LOGIN_ENDPOINT = "/login";

// Function to handle user registration
export async function register(axiosInstance, userInfo) {
  try {
    const response = await postRequest(
      axiosInstance,
      REGISTER_ENDPOINT,
      userInfo
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// Function to handle user login
export async function login(axiosInstance, credentials) {
  try {
    //console.log(credentials);
    const response = await postRequest(
      axiosInstance,
      LOGIN_ENDPOINT,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
