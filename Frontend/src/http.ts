import axios, { type AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://26.200.50.169:8386",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Add Authorization: Bearer <token> when authenticated
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
