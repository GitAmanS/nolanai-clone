const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const passport = require("passport");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  async (req, res) => {
    console.log("auth req...")
    

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    console.log("Password before hashing:", password);

  
    try {
      let user = await User.findOne({ email });

      if (user) {
        // Login
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      } else {
        // Register
        const hashedPassword = await bcrypt.hash(String(password), 10);
        user = new User({ email, password: hashedPassword });
        await user.save();
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {

      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

module.exports = router;