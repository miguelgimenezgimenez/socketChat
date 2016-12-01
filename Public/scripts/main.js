'use strict';

function renderQuote (content, timestamp,user, dontstore) {

  let msgDiv = $('<div>');
  msgDiv.addClass('messageBubble');
  console.log(user);
  if (user === 'user') {
    msgDiv.addClass('user');
  }
  msgDiv.html(content);
  let time = $('<p>');
  time.html(timestamp);
  msgDiv.append(time);



  $('.chatWindow').append(msgDiv);

  if (!dontstore) storeMessage(content, timestamp, user);
}

function filterQuote (response) {
  renderQuote(response.quoteText ,moment().format('lll'), 'visitor');
}

function getQuote () {
  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en',
    method: 'GET',
    data : {jsonp : 'filterQuote', format : 'jsonp'},
    dataType : 'jsonp'
  });
}

function getStoredMessages () {
  $.ajax({
    url: 'messages',
    method: 'GET' ,
    dataType : 'json' ,
    success : printMessages

  });
  function  printMessages(msgArray) {
    for (var i in msgArray) {
      console.log(msgArray);
      const msg =msgArray[i];
      renderQuote(msg.content, msg.timestamp, msg.userName,true);
    }
  }
}
function storeMessage (content, time,user) {
  $.ajax({
    url: 'messages',
    method: 'POST',
    data: {content: content, userName: user , time: time}
  });
}
const socket = io();


$(document).ready(function () {

  getStoredMessages();

  $('#target').submit(function (event) {


    const textbox = $('#textbox');
    event.preventDefault();
    const content = textbox.val();
    socket.emit('chat message',content);
    let time = moment().format('lll');
    renderQuote(content, time, 'user');
    textbox.val('');
    setTimeout(function () {
      getQuote();
    }, 1500);

  });

});