const express = require('express');
const Records = require('../model/records');
const router = express.Router();

router.get("", (req, res, next) => {
  Records.find({ _id: '5d95ecf870c70c1e5a164615' })
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
