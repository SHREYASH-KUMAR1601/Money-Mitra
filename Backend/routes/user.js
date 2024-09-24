// backend/routes/user.js


const express = require('express');
const router = express.Router(); // Create a router instance
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const bcrypt = require('bcrypt'); 
const { User } = require('../models/User'); 
const { Account } = require("../models/Account");

// Joi Schemas
const signupSchema = Joi.object({
  username: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(6).required() // Add minimum password length
});

const signinSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateSchema = Joi.object({
  password: Joi.string().optional().min(6), // Add minimum length for updated password
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional()
});

// --- SIGNUP ROUTE ---
router.post("/signup", async (req, res) => { 
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(req.body.password, 10); 

  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
  });

  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ message: "User created successfully", token });
});

// --- SIGNIN ROUTE ---
router.post("/signin", async (req, res) => {
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
});

// --- UPDATE ROUTE ---
router.put("/", authMiddleware, async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  await User.updateOne({ _id: req.userId }, req.body); 

  res.json({ message: "Updated successfully" });
});


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
