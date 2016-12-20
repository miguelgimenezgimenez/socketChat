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
const message = require('./controllers/message');
const pug = require('pug');


io.on('connection', function(socket){
  console.log(io.sockets.adapter.sids[socket.id][roomname]  );

  socket.on('newConnection', function (user) {
    const msg = new Promise(function (resolve, reject) {
      resolve(message.getAll());
    });
    msg.then(function (content) {
      socket.emit('getmessages',content  );
    });
  });

  socket.on('chat message', function(msg){
    message.post(msg);
    const myTemplate = pug.renderFile(__dirname + '/View/messageTemplate.pug',{message: msg.content, user:msg.userName, timestamp: msg.timestamp});
    io.emit('getmessages',[myTemplate]);
  });
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  http.listen(8080 , function () {
    console.log('listening');
  });
});



