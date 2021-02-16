const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production") {
    app.use(express.static(`${__dirname}/public/`))
}

// todos route
const todos = require("./routes/api/todos");
app.use("/api/todos", todos);


// send index.html for all other routes
app.get(/.*/, (request, response)=> response.sendFile(`${__dirname}/public/index.html`))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
