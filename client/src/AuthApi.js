import axios from "axios"
import store from "./store"

const authClient = axios.create({
  baseURL: "//localhost:4000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

// interceptor to refresh token automatically
authClient.interceptors.response.use(
  res => res,
  async error => {
    const {
      config,
      response: { status }
    } = error

    const originalRequest = config

    // error if not due to authorization
    if (status !== 401) {
      return Promise.reject(error)
    }

    // refresh token is expired => logout
    if (originalRequest.url == "/token") {
      store.dispatch("logout")
    }

    return Promise.reject(error)
  }
)

export default authClient
