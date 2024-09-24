const express = require("express");

const router = express.Router;

const userRoutes = require("../routes/user")
router.use("/user",userRoutes);
router.use("/accounts" , accountRoutes);

module.exports = {
    router
}