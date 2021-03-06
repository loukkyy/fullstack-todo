import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Todos from "../views/Todos.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/todos",
    name: "todos",
    component: Todos,
    meta: { requiredAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "registeruser" */ "../views/Register.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// guard authenticated routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("user")
  if (to.matched.some(route => route.meta.requiredAuth) && !isLoggedIn) {
    next("/")
  } else {
    next()
  }
})

export default router
