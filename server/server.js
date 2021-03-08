const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
// use json from request body
app.use(express.json())
app.use(cors())

// access form attributes from client
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/public/`))
}

app.use("/api/todos", require("./routes/api/todos"))

app.use("/auth", require("./routes/api/auth"))

// send index.html for all other routes
app.get(/.*/, (request, response) =>
  response.sendFile(`${__dirname}/public/index.html`)
)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
