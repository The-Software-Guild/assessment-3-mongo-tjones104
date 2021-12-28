const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// express app
const app = express();

// connect to database
const URI =
  "mongodb+srv://tjones104:4356@labs.nl69h.mongodb.net/mern_bug_tracker?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then((result) => console.log("Connected to the database"))
  .catch((err) => console.log(err));

// constants
const PORT = 8080;

// application level middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(morgan("dev"));

// route initialize
app.use("/api", require("./routes/bugsIntake"));
app.use("/api", require("./routes/usersIntake"));

// global error handler
app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ error: { status: err.status || 500, message: err.message } });
});

// server startup logic
const server = app.listen(PORT, () => {
  console.log(`Server started | Link: http://localhost:${PORT}/`);
});
