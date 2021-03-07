const path = require("path")

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
      "/login": {
        target: "http://localhost:4000",
      },
      "/logout": {
        target: "http://localhost:4000",
      },
      "/token": {
        target: "http://localhost:4000",
      },
      "/register": {
        target: "http://localhost:4000",
      }
    },
  },
}
