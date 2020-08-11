const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('config');
const express = require('express');
const router = express.Router();

//@route POST api/auth
//@desc Auth user and get token
//@access public

router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password, email, name } = req.body;
    try {
      let user = await User.findOne({ username });
      let userEmail;
      try {
        userEmail = await User.findOne({ email });
        if (userEmail) {
          return res.status(400).json({ msg: 'Email is already used' });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

      if (user) {
        return res.status(400).json({ msg: 'Username already exists' });
      }
      user = new User({
        name,
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
