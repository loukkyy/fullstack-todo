import axios from "axios"

// const HOST = "localhost"
// const PORT = 5000
const API_URL = "/api"

const apiClient = axios.create({
  // baseURL: `http://${HOST}:${PORT}${API_URL}`,
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export async function getTodos() {
  return apiClient.get("/todos")
}

export async function addTodo(text) {
  return apiClient.post("/todos", { text: text })
}

export async function deleteTodo(id) {
  return apiClient.delete(`/todos/${id}`)
}
