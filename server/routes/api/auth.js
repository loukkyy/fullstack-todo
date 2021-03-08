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

// test data
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
  if (refreshToken == null)
    return res
      .status(401)
      .json({ error: "No refresh token present in header." })

  if (!refreshTokens.includes(refreshToken))
    return res.status(401).json({ error: "Refresh token not valid." })

  // verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      // not valid
      // remove refresh token
      refreshTokens = refreshTokens.filter((token) => token != refreshToken)

      // return not valid
      return res.status(401).json({ error: "Refresh token not valid." })
    }
    const accessToken = generateAccessToken({ email: user.email })
    return res.json({ accessToken })
  })
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
      // if fail =>
      return res.status(401).json({ error: "Invalid login. Please try again." })
    }
  } catch (error) {
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
