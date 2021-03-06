const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
// use json from request body
app.use(express.json())
app.use(cors())

// access form attributes from client
app.use(express.urlencoded({ extended: false }))

app.use("/", require("./routes/api/auth"))

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server started on port ${port}`))
