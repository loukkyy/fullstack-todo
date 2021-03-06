<template>
  <div v-if="error" class="error">{{ error }}</div>
  <form @submit.prevent="register" class="register-form">
    <label for="email">
      Email
    </label>
    <input
      class="input"
      v-model="email"
      type="email"
      name="email"
      placeholder="Enter your email"
      required
    />

    <label for="password">
      Password
    </label>
    <input
      class="input"
      v-model="password"
      type="password"
      placeholder="Enter your password"
      required
    />

    <button type="submit" name="button" class="btn">
      Register
    </button>
  </form>
  <div>
    Already have an account?
    <router-link :to="{ name: 'login' }">Login</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: "",
      email: "",
      password: ""
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "login" })
        })
        .catch(err => (this.error = err.response.data.error))
    }
  }
}
</script>

<style>
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.8rem;
}
</style>
