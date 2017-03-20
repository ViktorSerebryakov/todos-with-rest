'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const index = require('./routes/index');
const database = require('./database');

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/public/main.js', index);
app.get('/public/styles.css', index);
app.get('/', index);
app.get('/index', index);

app.get('/api/', api);
app.post('/api/', api);
app.put('/api/:id', api);
app.delete('/api/:id', api);




app.listen(9001, function () {
  console.log('listening on port 9001!');
});
