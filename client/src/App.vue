<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.input {
    border: 1px solid #AAA;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    padding: .5em;
    border-radius: .2em;
}
.input:focus {
    border-color: hsl(200, 100%, 50%);
    box-shadow: 0 0 5px hsl(200, 100%, 50%);
}
.btn {
  outline: none;
  border: 1px solid hsl(200, 100%, 50%);
  padding: 0.5em 1em;
  cursor: pointer;
  text-align: center;
  border-radius: 0.3em;
  font: inherit;
}
.btn:hover,
.btn:focus {
  box-shadow: 0 0 5px hsl(200, 100%, 50%);
}
</style>
