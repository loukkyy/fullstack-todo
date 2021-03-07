<template>
  <div class="home-container">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <h1>Fullstack - MEVN - Awesome Todo ✅</h1>
    <div v-if="!isLoggedIn">
      To use this app you'll need to
      <router-link :to="{ name: 'login' }">
        Login
      </router-link>
      or
      <router-link :to="{ name: 'register' }">
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "home",
  components: {},
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
