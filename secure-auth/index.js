
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT || 3000;
const express = require("express");
require("./db/dbConnection");
const helmet = require("helmet");
const userrouter = require("./routers/userRouter");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(userrouter);


app.listen(port, () => {
    console.log("Server Listening..");
});






