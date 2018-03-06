var express = require('express');
var router = express.Router();
const { request } = require('graphql-request')
var fs = require("fs");
var path = require('path');
/* GET home page. */
router.post('/', function(req, res, next) {
  let query = `
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
      nameFile
    }
  }`
  request('http://localhost:4000', query).then(data => console.log('example query on the server', data))


  var dest = path.join(__dirname, '../..', 'express/public/images/')

  // sned file to front
  // res.setHeader("content-type", "some/type");
  fs.createReadStream(`${dest}a.jpg`).pipe(res);

});

module.exports = router;
