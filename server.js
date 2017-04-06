'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));

function proxyApi(request, response) {
  console.log('Routing API request for ', request.params[0]);
  (requestProxy({
    url: `http://apilayer.net/api/${request.params[0]}?access_key=${process.env.APP_TOKEN}`
  }))(request, response);
}
app.get('/apilayer/*', proxyApi);
