const mongodb = require("mongodb")

const USERNAME = process.env.DB_USER
const PASSWORD = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST

async function getClient() {
  return await mongodb.MongoClient.connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}

async function getCollection(name) {
  const client = await getClient()
  return client.db(DB_NAME).collection(name)
}

async function getDb() {
  const client = await getClient()
  return client.db(DB_NAME)
}

module.exports = {
  getCollection,
  getDb
}
