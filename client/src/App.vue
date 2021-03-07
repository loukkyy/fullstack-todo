<template>
    <NavBar />
    <div class="container">
      <router-view v-slot="{ Component }" class="smooth-transition">
        <transition
          enter-active-class="animate__animated animate__fadeInRight"
          leave-active-class="animate__animated animate__fadeOutLeft"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import url("./assets/styles.css");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
  background: linear-gradient(180deg, hsl(153, 40%, 66%), hsl(153, 40%, 46%));
}
.container{
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.smooth-transition {
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
