const express = require("express")
const router = express.Router()
const mongodb = require("mongodb")
const MongodbService = require("../../services/MongodbService.js")
const { verifyToken } = require('../../services/AuthService')

// get todos
router.get("/", verifyToken, async (request, response) => {
  const posts = await loadTodos()
  response.json(await posts.find({}).toArray())
})

// post todo
router.post("/", verifyToken, async (request, response) => {
  const todos = await loadTodos()
  await todos.insertOne({
    text: request.body.text,
    createdAt: new Date(),
  })
  response.status(201).send()
})

// delete todo
router.delete("/:id", verifyToken, async (request, response) => {
  const todos = await loadTodos()
  await todos.deleteOne({ _id: new mongodb.ObjectID(request.params.id) })
  response.status(200).send("deleted")
})

async function loadTodos() {
  return await MongodbService.getCollection("todos")
}

module.exports = router
