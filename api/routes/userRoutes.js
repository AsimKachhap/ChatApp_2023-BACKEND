const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.post("/register", authController.register);
router.get("/register", authController.getUser);

module.exports = router;
