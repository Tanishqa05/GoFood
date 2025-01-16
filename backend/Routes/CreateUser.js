const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "taniisagoodgirl$";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password", "Recheck Password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Recheck Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ error: "Enter valid credentials" });
      }
      const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter valid credentials" });
      }

      const data ={
        user:{
          id:userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
