<template>
  <div class="todo" v-if="todo">
    <div class="content">
    <h4>{{ todo.text }}</h4>
    <p>Created at: {{ `${todo.createdAt.getDate()}/${todo.createdAt.getMonth()}/${todo.createdAt.getFullYear()}` }}</p>

    </div>
    <button class="delete-btn" 
        @click="$emit('deleteMe', {id: todo._id})">X</button>
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
  user-select: none;
  display: flex;
}
.content {
  padding: 0.5em;
  flex: 9;
}
.delete-btn {
  flex: 1;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
  font: inherit;
  font-size: 3rem;
  background-color: coral;
}
.delete-btn:hover,
.delete-btn:focus {
  cursor: pointer;
  background-color: hsl(16, 100%,46%);

}
</style>
