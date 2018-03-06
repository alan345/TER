
var express = require('express');
var router = express.Router();
const { GraphQLClient } = require('graphql-request')
var fs = require("fs");
var path = require('path');
var csv = require('csv-express')

router.use('/', function(req, res, next) {
  req.token = req.headers['authorization'];
  next();
})

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
  // request('http://localhost:4000', query).then(data => {
  //   res.csv(data.feed)
  // })

  // var token = req.headers['authorization'];
  console.log(req.token)
  const client = new GraphQLClient('http://localhost:4000', {
    headers: {
      Authorization: req.token,
    },
  })
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
  let query2 = `
  query DraftsQuery {
    drafts {
      id
      text
      title
      isPublished
      nameFile
    }
  }`
  client.request(query2)
  .then(data => {
    res.csv(data.drafts)
  })
  .catch(err => {
    console.log(err) // GraphQL response errors
  })


// res.set('Content-Type', 'application/octet-stream');
// var dest = path.join(__dirname, '../..', 'express/public/images/a.csv')
// var file = fs.createWriteStream(dest);
// res.send(dest);

//
// var dest = path.join(__dirname, '../..', 'express/public/images/a.csv')
// res.attachment(dest);
// res.status(200).send({});
  // var dest = path.join(__dirname, '../..', 'express/public/images/a.jpg')
  // console.log(dest)
  // res.download(dest);
  // var file = fs.createWriteStream(dest);
  // res.download(dest);

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
