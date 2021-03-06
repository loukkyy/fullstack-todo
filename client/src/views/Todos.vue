<template>
  <div class="home">
    <TodosList />
  </div>
</template>

<script>
import TodosList from "@/components/TodosList.vue"

export default {
  name: "Todos",
  components: {
    TodosList
  }
}
</script>
