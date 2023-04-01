const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("../api/routes/userRoutes");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
    });
    console.log("CONNECTED TO MONGODB SERVER");
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR", error);
  }
})();

// ROUTING MIDDLEWARES
app.get("/", (req, res) => {
  console.log("Welcome You are on Home Page.");
  res.send("Welcome You are on Home Page.");
});

// USERS ROUTE
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`SERVER IS UP AND RUNNING ON ${PORT}`);
});
