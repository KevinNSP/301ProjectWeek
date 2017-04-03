'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://kevin:test@localhost:5432/kilovolt'
const client = new pg.Client(conString);
client.connect();
client.on('error', function(error) {
  console.error(error);
});
