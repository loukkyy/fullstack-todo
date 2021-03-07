<template>
  <div class="hello">
    <form
      action=""
      method="post"
      @submit.prevent="submitTodo"
      class="todo-form"
    >
      <input
        type="text"
        name="text-input"
        id="text-input"
        placeholder="Create a task"
        v-model="text"
        class="input"
      />
      <button type="submit" :disabled="text === '' || isLoading" class="btn">
        Add
      </button>
      <button class="btn" @click.prevent="fetchTodos">Refresh</button>
    </form>

    <p class="error" v-if="error">{{ error }}</p>
    <Spinner v-if="isLoading" />
    <div class="todos" v-else>
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
import Todo from "@/components/Todo.vue"
import Spinner from "@/components/Spinner.vue"

export default {
  name: "TodosList",
  components: {
    Todo,
    Spinner
  },
  data() {
    return {
      todos: [],
      error: "",
      text: "",
      isLoading: false
    }
  },
  methods: {
    fetchTodos() {
      this.isLoading = true
      this.error = ""
      this.$store
        .dispatch("getTodos")
        .then(({ data }) => data)
        .then(data =>
          data.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt)
          }))
        )
        .then(todos => {
          this.todos = todos
          this.isLoading = false
        })
        .catch(err => {
          this.error = err.message
          this.isLoading = false
        })
    },
    submitTodo() {
      this.$store
        .dispatch("addTodo", this.text)
        .then(response => {
          if (response.status === 201) {
            this.text = ""
            this.fetchTodos()
          }
        })
        .catch(err => (this.error = err.message))
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id).then(response => {
        if (response.status === 200) {
          this.fetchTodos()
        }
      })
    }
  },
  created() {
    this.fetchTodos()
  }
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
  padding: 1rem;
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
  margin: 20px 0px;
}
</style>
