const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("Welcome You are on Home Page.");
  res.send("Welcome You are on Home Page.");
});

app.listen(8080, () => {
  console.log(`SERVER IS UP AND RUNNING ON ${PORT}`);
});
