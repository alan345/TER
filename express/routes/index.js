
var express = require('express');
var router = express.Router();
const { request } = require('graphql-request')
var fs = require("fs");
var path = require('path');



router.get('/', function(req, res, next) {
  // let query = `
  // query FeedQuery {
  //   feed {
  //     id
  //     text
  //     title
  //     isPublished
  //     nameFile
  //   }
  // }`
  // request('http://localhost:4000', query).then(data => console.log('example query on the server', data))


  // var dest = path.join(__dirname, '../..', 'express/public/images/a.jpg')
  // res.download(dest);
  // var file = fs.createWriteStream(dest);
  // res.download('./a.jpg');

  // res.download('./a.jpg')
  // res.set('Content-Type', 'application/octet-stream');
  // res.send(file);

  // res.setHeader("content-type", "application/octet-stream'");
  // fs.createReadStream(dest).pipe(res);
  // console.log(dest)
  // console.log(file)
  // res.pipe(file);
  // sned file to front
  // res.setHeader("content-type", "application/octet-stream");
  // fs.createReadStream('./a.jpg').pipe(res);

  // res.sendFile(dest);

});

module.exports = router;
