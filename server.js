'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const request = require('request');
const app = express();

const PORT = process.env.PORT || 4000;

http://apilayer.net/api/list?access_key=0e0b2c550a586eca8af82847a443b3ed

app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));

// function proxyApi(request, response) {
//   console.log('Routing API request for ', request.params[0]);
//   (requestProxy({
//     url: `http://apilayer.net/api/${request.params[0]}?access_key=${process.env.APP_TOKEN}`
//   }))(request, response);
// }
// function getData() {
//   request('http://apilayer.net/api/list?access_key=0e0b2c550a586eca8af82847a443b3ed', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body) // Print the body of response.
//     }
//   })
// }

app.get('/apilayer/list', function(req, res) {
  request(`http://apilayer.net/api/list?access_key=${process.env.APP_TOKEN}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the body of response.
      res.json(body);
    }
  })
});

app.get('/apilayer/live', function(req, res) {
  request(`http://apilayer.net/api/live?access_key=${process.env.APP_TOKEN}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body); // Print the body of response.
      res.json(body);
    }
  })
});
