import { createStore } from "vuex"
import apiClient from "../TodoApi"
import authClient from "../AuthApi"

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem("user", JSON.stringify(userData))
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.accessToken}`
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user")
      location.reload()
    },
    SET_ACCESS_TOKEN(state, data) {
      state.user.accessToken = data.accessToken
      localStorage.setItem("user", JSON.stringify(state.user))
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    register({ commit }, credentials) {
      return authClient
        .post("/register", credentials)
    },
    login({ commit }, credentials) {
      return authClient
        .post("/login", credentials)
        .then(({ data }) => commit("SET_USER_DATA", data))
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA")
    },
    refreshToken({ commit, state }) {
      return authClient
        .post("/token", { refreshToken: state.user.refreshToken })
        .then(({ data }) => {
          commit("SET_ACCESS_TOKEN", data)
        })
    },
    getTodos() {
      return apiClient.get("/todos")
    },
    // eslint-disable-next-line no-unused-vars
    addTodo({ commit }, text) {
      return apiClient.post("/todos", { text })
    },
    // eslint-disable-next-line no-unused-vars
    deleteTodo({ commit }, id) {
      return apiClient.delete(`/todos/${id}`)
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user
    },
    getUserAccessToken(state) {
      return state.user.accessToken
    }
  },
  modules: {}
})
