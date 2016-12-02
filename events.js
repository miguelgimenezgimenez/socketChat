'use strict';
const message = require('./controllers/message');


exports.newConnection = function (user) {
  const msg = new Promise(function (resolve, reject) {
    resolve(message.getAll());
  });
  msg.then(function (content) {
    socket.emit('getmessages', content);
  });
};


exports.newMessage = function(msg){
  message.post(msg);
  socket.broadcast.emit('getmessages', [msg]);
  console.log('message: ' + msg.content);
};