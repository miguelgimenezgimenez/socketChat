'use strict';

const app = require('koa')();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const db = require('./config/db.js');
const router = require('./router.js');

app.use(bodyParser());
app.use(router.routes());
app.use(serve(__dirname + '/Public'));

const http = require('http').Server(app.callback());
const io = require('socket.io')(http);



io.on('connection', function(socket){
  console.log('connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  http.listen(8080 , function () {
    console.log('listening');
  });
});



