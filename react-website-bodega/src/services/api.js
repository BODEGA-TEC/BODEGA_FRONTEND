import axios from "axios";
import { host } from "../config";

export default axios.create({
  baseURL: host + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
