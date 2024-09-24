const express = require("express");
const router = express.Router();
const userRoutes = require("./user"); // Import the user routes
const accountRoutes = require("./account"); // Import the account routes

router.use("/user", userRoutes); 
router.use("/accounts", accountRoutes); 

module.exports = router; // Export the main router
