import axios from "axios"
import api from "../api"
import { store } from "../../app/store";
import { logout, pullTokenFromStorage } from "../../app/slices/authSlice";

let isRefreshing = false
let failedQueue: any[] = []

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })

  failedQueue = []
}

const refreshTokenInterceptor = async (error: any) => {
    const originalRequest = error.config
    if (error.response?.status !== 401){
      return Promise.reject(error)
    }

    if (originalRequest._retry){
      store.dispatch(logout())
      return Promise.reject(error)
    }

    if (originalRequest.url === "/auth/refresh") {
      store.dispatch(logout())
      return Promise.reject(error)
    }

    originalRequest._retry = true
    const refreshToken = localStorage.getItem("refresh_token")

    if (!refreshToken){
      store.dispatch(logout())
      return Promise.reject(error)
    }

    if (isRefreshing){
      return new Promise((resolve, reject) => {
        failedQueue.push({resolve, reject})
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    isRefreshing = true

    try {
      const res = await refreshClient.post(`/auth/refresh`, {
        refresh_token: refreshToken
      })

      const {access_token, refresh_token} = res.data

      localStorage.setItem("access_token", access_token)
      store.dispatch(pullTokenFromStorage())
      localStorage.setItem("refresh_token", refresh_token)

      api.defaults.headers.common.Authorization = `Bearer ${access_token}`

      return api(originalRequest)
    } catch (err) {
      processQueue(err, null)
      store.dispatch(logout())
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }

export default refreshTokenInterceptor