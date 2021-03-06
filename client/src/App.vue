<template>
  <NavBar />
  <router-view />
</template>
<script>
import NavBar from "./components/NavBar"

export default {
  components: {
    NavBar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.input {
  border: 1px solid #aaa;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  padding: 0.5em;
  border-radius: 0.2em;
}
.input:focus {
  border-color: hsl(200, 100%, 50%);
  box-shadow: 0 0 5px hsl(200, 100%, 50%);
}
.btn {
  outline: none;
  border: 1px solid hsl(200, 100%, 50%);
  padding: 0.3em 1em;
  cursor: pointer;
  text-align: center;
  border-radius: 0.3em;
  font: inherit;
}
.btn:hover,
.btn:focus {
  box-shadow: 0 0 5px hsl(200, 100%, 50%);
}

.error {
  color: red;
}
</style>
