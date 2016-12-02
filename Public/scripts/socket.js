

function postMessage (content, timestamp,user, dontstore) {

  let msgDiv = $('<div>');
  msgDiv.addClass('messageBubble');
  if (user === 'user') {
    msgDiv.addClass('user');
  }
  msgDiv.html(content + user);
  let time = $('<p>');
  time.html(timestamp);
  msgDiv.append(time);

  $('.chatWindow').append(msgDiv);

}


function  printMessages(msgArray) {
  for (let i in msgArray) {
    const msg =msgArray[i];
    postMessage(msg.content, msg.timestamp, msg.userName,true);
  }
}

const socket = io();

$(document).ready(function () {

  const userName = prompt('Enter user userName');
  socket.emit('newConnection', userName);

  socket.on('getmessages', function (messages) {
    printMessages(messages);
  });


  $('#target').submit(function (event) {
    const textbox = $('#textbox');
    event.preventDefault();
    const content = textbox.val();
    let timeStamp = moment().startOf('hour').fromNow();
    postMessage(content, timeStamp, userName);
    socket.emit('chat message', {content:content, userName: userName,
    timeStamp: timeStamp});
    textbox.val('');
  });
});