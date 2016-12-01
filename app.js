'use strict';

const app = require('koa')();

const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const db = require('./config/db.js');
const router = require('./router.js');

app.use(bodyParser());
app.use(router.routes());
app.use(serve(__dirname + '/Public'));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(3000);
  console.log('Listening');
});







