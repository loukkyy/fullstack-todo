import axios from "axios"
import store from "./store"

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

// interceptor to refresh token automatically
apiClient.interceptors.response.use(
  res => res,
  async error => {
    const {
      config,
      response: { status, data }
    } = error

    const originalRequest = config

    // error if not due to authorization
    if (status !== 401) {
      return Promise.reject(error)
    }

    // refresh token
    if (data.error === "Access token has expired.") {
      await store.dispatch("refreshToken")
      originalRequest.headers.Authorization = `Bearer ${store.getters.getUserAccessToken}`
      return axios(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default apiClient
