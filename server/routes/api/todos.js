const express = require("express")
const mongodb = require("mongodb")
const MongodbService = require("../../services/MongodbService.js")
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

async function loadTodos() {
  return await MongodbService.getCollection("todos")
}

module.exports = router
