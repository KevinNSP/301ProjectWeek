'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const request = require('request');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

app.get('/*', (request, response) => response.sendFile('index.html', {root: './public'}));

app.get('/apilayer/list', function(req, res) {
  request(`http://apilayer.net/api/list?access_key=${process.env.APP_TOKEN}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
});

app.get('/apilayer/live', function(req, res) {
  request(`http://apilayer.net/api/live?access_key=${process.env.APP_TOKEN}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
});
