var express = require('express')
var router = express.Router()
var path = require('path')
const { GraphQLClient } = require('graphql-request')

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  const client = new GraphQLClient('http://localhost:4000', {
    headers: req.headers
  })
  let queryMe = `
    query {
      me {
        id
      }
    }`
  client.request(queryMe)
    .then(data => {
      next()
    })
    .catch(err => {
      console.log('err', err) // GraphQL response errors
      return res.status(500).send(err)
    })
})

router.post('/', (req, res, next) => {
  console.log('post alan')
  let imageFile = req.files.file;

  var dest = path.join(__dirname, '../..', 'media/public/images/')
  imageFile.mv(`${dest}${req.files.file.name}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/images/${req.files.file.name}`});
  });

})


module.exports = router;
