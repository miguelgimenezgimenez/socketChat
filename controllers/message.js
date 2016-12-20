'use strict';

const Message = require('../models/message.js');

const pug = require('pug');



exports.getAll = function  () {
    return Message.find().then(function (content) {
      const output=[];
      content.forEach(function (msg) {
        const myTemplate = pug.renderFile(__dirname + '/../View/messageTemplate.pug',{message: msg.content, user:msg.userName, timestamp: msg.timestamp});
        output.push(myTemplate);
      });
      return output;
   });
};

exports.post = function (msg) {
  const newMsg = new Message({
    content: msg.content,
    timestamp: msg.timestamp,
    userName: msg.userName
  });
  let savems = function * () {
    yield newMsg.save();
  };
  this.status = 200;
  savems().next();
};

