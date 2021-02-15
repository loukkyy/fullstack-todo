<template>
  <div class="hello">
    <h1>Fullstack - MEVN - Awesome Todo ✅ </h1>
    <form action="" method="post" @submit.prevent="submitTodo" class="todo-form">
      <input
        type="text"
        name="text-input"
        id="text-input"
        placeholder="Create a task"
        v-model="text"
        class="input"
      />
      <button type="submit" :disabled="text===''" class="btn">Add</button>
    </form>
    <p class="error" v-if="error" {{ error }}></p>
    <div class="todos">
      <Todo
        v-for="todo in todos"
        :key="todo._id"
        :todo="todo"
        @deleteMe="deleteTodo(todo._id)"
      />
    </div>
  </div>
</template>

<script>
import { getTodos, addTodo, deleteTodo } from "@/services/todos-service.js"
import Todo from "@/components/Todo.vue"
export default {
  name: "Todos",
  components: {
    Todo,
  },
  data() {
    return {
      todos: [],
      error: "",
      text: "",
    }
  },
  methods: {
    fetchTodos() {
      getTodos()
        .then((response) => response.data)
        .then((data) =>
          data.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          }))
        )
        .then((todos) => (this.todos = todos))
        .catch((err) => (this.error = err.message))
    },
    submitTodo() {
      addTodo(this.text)
        .then((response) => {
          if (response.status === 201) {
            console.log(`${this.text} has been submited`)
            this.text = ''
            this.fetchTodos()
          }
        })
        .catch((err) => (this.error = err.message))
    },
    deleteTodo(id) {
      deleteTodo(id).then((response) => {
        if (response.status === 200) {
          console.log(`Task ${id} has been deleted`)
          this.fetchTodos()
        }
      })
    },
  },
  created() {
    this.fetchTodos()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.todos > .todo {
  margin: 5px 0px;
  width: 80vw;
}
.todo-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
