import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import {
  clearLocalStorage,
  getTokenFromLocalStorage,
  setProfileToLocalStorage,
  setTokenToLocalStorage,
} from "./utils/auth";
import path from "./constants/path";
import { AuthResponse } from "./types/auth.types";

class Http {
  instance: AxiosInstance;
  private token: string;

  constructor() {
    this.token = getTokenFromLocalStorage();
    this.instance = axios.create({
      baseURL: "http://26.200.50.169:8386",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use((config) => {
      if (this.token && config.headers) {
        config.headers.Authorization = `Bearer ${this.token}`;
        return config;
      }
      return config;
    });

    // Add Authorization: Bearer <token> when authenticated
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { url } = response.config;
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse;
          this.token = data.token;
          setTokenToLocalStorage(this.token);
          setProfileToLocalStorage(data.user);
        } else if (url === path.logout) {
          this.token = "";
          clearLocalStorage();
        }
        return response;
      },

      function onRejected(error: AxiosError) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response?.status == HttpStatusCode.Unauthorized) {
          clearLocalStorage();
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
