const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongodb = require("mongodb")
const MongodbService = require("../../services/MongodbService.js")
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../services/AuthService")

let { refreshTokens } = require("../../services/AuthService")

// test data
const users = [
  {
    id: "1615052252528",
    email: "sponge.bob@ocean.com",
    // password: 1
    password: "$2b$10$N6TrTnihOy.luzvn5lU6oeDxbzg8uOSQTNmQw84Wz.8QDP8GHRsdW",
  },
]

// refresh token
router.post("/token", verifyRefreshToken, async (req, res) => {
  const accessToken = generateAccessToken({ email: req.user.email })
  return res.json({ accessToken })
})

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  // check user exists
  const user = users.find((user) => user.email === email)
  if (user == null) {
    return res.status(401).json({ error: "Invalid login. Please try again." })
  }
  try {
    // verify password
    if (await bcrypt.compare(password, user.password)) {
      // if success => create tokens
      const accessToken = generateAccessToken({ email })
      const refreshToken = generateRefreshToken({ email })
      refreshTokens.push(refreshToken)

      console.log(`Account ${email} logged in`)
      return res.status(200).json({ accessToken, refreshToken })
    } else {
      // Passwords do not match
      console.log("Passwords dot not match")
      return res.status(401).json({ error: "Invalid login. Please try again." })
    }
  } catch (error) {
    console.log("An error has occured", error)
    return res.status(500).send(error)
  }
})

// logout
router.post("/logout", async (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token != req.body.refreshToken
  )
  res.sendStatus(204)
})

// register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body

    // check if email and password are not null
    if (!email || !password) {
      const message = "Email or password not provided. Cannot register user."
      console.log(message)
      res.sendStatus(400).send({ error: message })
    }

    // check if email already exists
    const user = users.find((user) => user.email === email)
    if (user) {
      res
        .status(400)
        .json({ error: "An account with this email already exists." })
      return
    }

    // generate hashed password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    // save user
    users.push({
      id: Date.now().toString(),
      email: req.body.email,
      password: hashedPassword,
    })

    // send response
    const message = `Acccount for ${req.body.email} created with success.`
    console.log(message)
    res.status(201).send(message)
  } catch {
    console.log("An error occured during registering")
  }
})

module.exports = router
