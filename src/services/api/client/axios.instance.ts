import { axiosConfig } from "@/src/services/api/client/axios.config";
import { setupInterceptors } from "@/src/services/api/client/axios.interceptors";
import axios from "axios";

export const apiClient = axios.create(axiosConfig);
setupInterceptors(apiClient);
