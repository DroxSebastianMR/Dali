import { axiosConfig } from "@/src/infrastructure/api/client/axios.config";
import { setupInterceptors } from "@/src/infrastructure/api/client/axios.interceptors";
import axios from "axios";

export const apiClient = axios.create(axiosConfig);
setupInterceptors(apiClient);
