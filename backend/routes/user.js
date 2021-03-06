const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'user created.',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});

router.post("/login", (req, res, next) => {
  let userFetched;
  console.log("user", req.body.email);
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      });
    }
    userFetched = user;
    return req.body.password === user.password;
    //return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    console.log("in result");
    if (!result) {
      return res.status(401).json({
        message: 'Authentication failed'
      })
    }
    const token = jwt.sign(
      { email: userFetched.email, userId: userFetched._id },
      "secret_this_should_be_longer",
      { expiresIn: "1hr"}
    );
    res.status(200).json({
      token: token,
      user: userFetched
    });
  })
  .catch(err => {
    res.status(401).json({
      message: 'Authentication failed'
    })
  })
});

module.exports = router;
