<template>
  <div class="card todo" v-if="todo">
    <div class="content">
      <h2>{{ todo.text }}</h2>
      <p>
        Created at:
        {{
          formattedDate
        }}
      </p>
    </div>
    <button class="delete-btn" @click="$emit('deleteMe', { id: todo._id })">
      <i class="far fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
import { format } from "date-fns"
export default {
  name: "Todo",
  props: {
    todo: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    formattedDate() {
      return format(this.todo.createdAt, "dd/MM/yyyy hh:mm:ss")
    }
  }
}
</script>

<style>
.todo {
  user-select: none;
  display: flex;
}
.content {
  padding: 0.8em;
  flex: 9;
}
.delete-btn {
  flex: 1;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
  font: inherit;
  font-size: 2rem;
  background-color: #8ac4ff;
  padding: 0.8rem;
}
.delete-btn:hover,
.delete-btn:focus {
  cursor: pointer;
  background-color: hsl(16, 100%, 46%);
}
</style>
