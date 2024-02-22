require("dotenv").config();
require("./config/database").connect();
const cors = require("cors");

const express = require("express");
const cookieParser = require("cookie-parser");

// Routers
const indexRouter = require("./route/index");
const authRouter = require("./route/auth");
const facebookRouter = require("./route/facebook");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"], //change origin based on domain main of the application
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
//Defining headers for cors
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/facebook", facebookRouter);

module.exports = app;
