<template>
  <div class="todo" v-if="todo">
    <h4>{{ todo.text }}</h4>
    <p>Created at: {{ `${todo.createdAt.getDate()}/${todo.createdAt.getMonth()}/${todo.createdAt.getFullYear()}` }}</p>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
.todo {
  border: solid 1px coral;
  padding: 0.5em;
  user-select: none;
}
.todo:hover{
  cursor: pointer;
}
</style>
