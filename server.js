require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = express.Router();
const routes = require("./routes/index");

// express app
const app = express();

const environment = process.env.NODE_ENV; // development
const stage = require("./config")[environment];

// logger
if (environment !== "production") {
  app.use(morgan("dev"));
}

// application level middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route initialize
app.use("/api", routes(router));

// global error handler
app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ error: { status: err.status || 500, message: err.message } });
});

// server startup logic
app.listen(`${stage.port}`, () => {
  console.log(`Server started | Link: http://localhost:${stage.port}/`);
});

module.exports = app;
