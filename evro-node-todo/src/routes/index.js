const express = require("express");

const todoRoutes = require("./todoRoutes");
const router = express.Router();

// Register routes
router.use("/todos", todoRoutes);

module.exports = router;
