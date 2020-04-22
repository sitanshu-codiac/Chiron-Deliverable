const express = require('express');
const Records = require('../model/records');
const router = express.Router();

router.get("", (req, res, next) => {
  Records.find({ _id: '5d9e1dbe6c3dc9435415a162' })
    .then(fetchedRecords => {
      if(fetchedRecords) {
        console.log(fetchedRecords);
        res.status(200).json(fetchedRecords)
      } else {
        res.status(404).json({message: "Records not found"})
      }
    });
});


module.exports = router;
