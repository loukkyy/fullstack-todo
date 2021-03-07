<template>
  <div id="nav">
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'todos' }">Todos</router-link>
    </div>

    <router-link v-if="!isLoggedIn" :to="{ name: 'login' }" class="btn"
      >Login</router-link
    >
    <button v-if="isLoggedIn" @click="logout" class="btn">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style>
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0.8em;
}

#nav a.router-link-exact-active {
  color: hsl(210, 100%, 47%);
}
</style>
