'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const request = require('superagent');
const app = express();
const currencyURL = 'http://apilayer.net/api/live?access_key=0e0b2c550a586eca8af82847a443b3ed'
const conString = 'postgres://kevin:test@localhost:5432/currency'

const PORT = process.env.PORT || 4000;

const client = new pg.Client(conString);
client.connect();
client.on('error', function(error) {
  console.error(error);
});

app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));

// DATABASE

let currencyData = [];

loadDB();

function loadCurrency(){
  client.query('SELECT COUNT(*) FROM currency')
  .then(result => {
    if(!parseInt(result.rows[0].count)){
  request.get(currencyURL)
  .then(res => {
    currencyData = res.body;
    console.log(currencyData);
    currencyData.map(ele => {
            client.query(`
              INSERT INTO
              currency(success, terms, privacy, currencies)
              VALUES ($1, $2, $3, $4, $5);
              `,
              [ele.success, ele.terms, ele.privacy, ele.currencies]
            ).catch(console.error);
          })
        }
      )}
  }).catch(err => console.error(err));
};

function loadDB(){
  client.query(`
    CREATE TABLE IF NOT EXISTS
    currency (
        id SERIAL PRIMARY KEY,
        success TEXT,
        terms TEXT,
        privacy TEXT,
        currencies TEXT
    )`
  ).then(loadCurrency).catch(console.error);
}

app.get('/currency', (request, response) => {
  client.query(`
    SELECT * FROM currency;
    `)
    .then(result => response.send(result.rows))
    .catch(console.error);
});
