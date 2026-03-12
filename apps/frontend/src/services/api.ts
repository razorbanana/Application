import axios from "axios";
import { authTokenInterceptor } from "./interceptors/authToken.interceptor";
import refreshTokenInterceptor from "./interceptors/refreshToken.interceptor";

const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(authTokenInterceptor);

api.interceptors.response.use(
  (response) => response,
  refreshTokenInterceptor
)

export default api;