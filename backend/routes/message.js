const express = require('express');
const Message = require('../model/contact');
const router = express.Router();

router.post("", (req, res, next) => {
  const message = new Message({
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });
  message.save()
    .then(result => {
      res.status(201).json({
        message: 'message added.',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
