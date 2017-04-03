'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
