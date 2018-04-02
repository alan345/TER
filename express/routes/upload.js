var express = require('express');
var router = express.Router();
var path = require('path');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
  res.send('respond with a resourcea');
});




router.post('/', (req, res, next) => {
  let imageFile = req.files.file;

  var dest = path.join(__dirname, '../..', 'express/public/images/')
  imageFile.mv(`${dest}${req.files.file.name}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/images/${req.files.file.name}`});
  });

})


module.exports = router;
