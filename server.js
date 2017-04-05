// 'use strict';
//
// const pg = require('pg');
// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');
// const requestProxy = require('express-request-proxy');
//
// const PORT = process.env.PORT || 3000;
// const app = express();
//
// app.use(express.static('./public'));
//
// app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

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
    currencyData.map(ele => {
            client.query(`
              INSERT INTO
              currency(name, "year", mass, recclass, reclat, reclong)
              VALUES ($1, $2, $3, $4, $5, $6);
              `,
              [ele.name, ele.year, ele.mass, ele.recclass, ele.reclat, ele.reclong]
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
        name TEXT,
        "year" DATE,
        mass DECIMAL,
        recclass TEXT,
        reclat DECIMAL,
        reclong DECIMAL
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
