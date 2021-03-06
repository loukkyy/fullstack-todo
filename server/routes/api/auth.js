const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongodb = require("mongodb")
const MongodbService = require("../../services/MongodbService.js")
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/AuthService")
const jwt = require("jsonwebtoken")

const users = [
  {
    id: "1615052252528",
    email: "sponge.bob@ocean.com",
    password: "$2b$10$N6TrTnihOy.luzvn5lU6oeDxbzg8uOSQTNmQw84Wz.8QDP8GHRsdW",
  },
]

let refreshTokens = []

// refresh token
router.post("/token", async (req, res) => {
  const { refreshToken } = req.body
  if (refreshToken == null) return res.sendStatus(401)

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401)

  // verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401)
    const accessToken = generateAccessToken({ email: user.email })
    res.json({ accessToken })
  })
})

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  // check user exists
  const user = users.find((user) => user.email === email)
  if (!user) {
    res.status(401).json({ error: "Invalid login. Please try again." })
    return
  }

  // verify password
  if (await !bcrypt.compare(password, user.password)) {
    res.status(401).json({ error: "Invalid login. Please try again." })
  }

  // create tokens
  const accessToken = generateAccessToken({ email })
  const refreshToken = generateRefreshToken({ email })
  refreshTokens.push(refreshToken)

  console.log(`${email} has logged in`)
  console.log(refreshTokens)
  res.status(200).json({ accessToken, refreshToken })
})

// logout
router.post("/logout", async (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token != req.body.refreshToken
  )
  console.log(refreshTokens)
  res.sendStatus(204)
})

// register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      console.log({
        error: "Email or password not provided. Cannot register user.",
      })
      res
        .sendStatus(400)
        .send({
          error: "Email or password not provided. Cannot register user.",
        })
    }

    // check if email already exists
    const user = users.find((user) => user.email === email)
    if (user) {
      res
        .status(400)
        .json({ error: "An account with this email already exists." })
      return
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashPassword)
    // save user
    users.push({
      id: Date.now().toString(),
      email: req.body.email,
      password: hashPassword,
    })
    // send response
    const message = `${req.body.email} has signed up`
    console.log(message)
    res.status(201).send(message)
  } catch {
    console.log("An error occured during registering")
  }
  console.log(users)
})

module.exports = router
