<template>
  <div class="centered-container">
    <div v-if="error" class="error">{{ error }}</div>
    <form class="card-form" @submit.prevent="login">
      <label for="email-input">Email</label>
      <input
        class="input"
        type="email"
        name="email"
        id="email-input"
        placeholder="Enter your email"
        required
        v-model="email"
      />
      <label for="password-input">Password</label>
      <input
        class="input"
        type="password"
        name="password"
        id="password-input"
        placeholder="Enter your password"
        required
        v-model="password"
      />
      <button type="submit" class="btn">Login</button>
    </form>
    <div>
      Don't have an account?
      <router-link :to="{ name: 'register' }">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      error: "",
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "todos" })
        })
        .catch(err => (this.error = err.response.data.error))
    }
  }
}
</script>

<style>

</style>
