const fs = require('fs');
let calls = require('../../data/calls.json');
const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.status(200).json(calls);
});


router.delete('/:callID', (req, res, next) => {
  calls = calls.filter(callObject => callObject.GUID != req.params.callID);
  fs.writeFile('./data/calls.json', JSON.stringify(calls, null, 2), function(err) {
    if (err) res.status(500).json({error: err});
    else res.status(200).json({message: 'ok'});
  });
});


module.exports = router;