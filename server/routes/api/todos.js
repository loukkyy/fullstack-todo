const express = require("express")
const mongodb = require("mongodb")
const router = express.Router()

// get todos
router.get("/", async (request, response) => {
  const posts = await loadTodos()
  response.send(await posts.find({}).toArray())
})

// post todo
router.post("/", async (request, response) => {
  const todos = await loadTodos()
  await todos.insertOne({
    text: request.body.text,
    createdAt: new Date(),
  })
  response.status(201).send()
})

// delete todo
router.delete("/:id", async (request, response) => {
  const todos = await loadTodos()
  await todos.deleteOne({ _id: new mongodb.ObjectID(request.params.id) })
  response.status(200).send("deleted")
})

const USERNAME = "user"
const PASSWORD = "pass1234"
const DB_NAME = "fullstack-todo-db"
async function loadTodos() {
  const client = await mongodb.MongoClient.connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.kz9x7.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    // "mongodb://localhost:27017",
    { useNewUrlParser: true }
  )
  return client.db("fullstack-todo").collection("todos")
}

module.exports = router
