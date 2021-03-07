const express = require("express")
const router = express.Router()
const mongodb = require("mongodb")
const MongodbService = require("../../services/MongodbService.js")
const { verifyToken, getTokenPayload } = require("../../services/AuthService")

// get todos
router.get("/", verifyToken, async (req, res) => {
  // get token payload from request
  const { email } = getTokenPayload(req)

  // load todos from db
  const todos = await loadTodos()

  // filter todos by user
  res.json(await todos.find({ createdBy: email }).toArray())
})

// post todo
router.post("/", verifyToken, async (req, res) => {
  // get payload
  const { text } = req.body

  // get token payload from request
  const { email } = getTokenPayload(req)

  // load todos from db
  const todos = await loadTodos()

  await todos.insertOne({
    text: text,
    createdBy: email,
    createdAt: new Date(),
  })
  res.status(201).send()
})

// delete todo
router.delete("/:id", verifyToken, async (req, res) => {
  const todos = await loadTodos()
  await todos.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send("deleted")
})

async function loadTodos() {
  return await MongodbService.getCollection("todos")
}

module.exports = router
