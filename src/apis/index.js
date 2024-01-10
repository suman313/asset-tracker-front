import axios from "axios";
import { setBaseUrl } from "../config";

const instance = axios.create({
  baseURL: setBaseUrl,
  headers: {
    "Content-Type": "application/json",
    // "x-access-tokens": sessionStorage.getItem("token"),
  },
});

// Function to get the token from localStorage
const getToken = () => sessionStorage.getItem("token");

// Interceptor to set the token dynamically before each request
instance.interceptors.request.use((config) => {
  config.headers["x-access-tokens"] = getToken();
  return config;
});

export const get_data_by_categories = () =>
  instance.get("/dashboard/get-data-by-model-category");
