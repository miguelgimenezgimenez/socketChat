

function postMessage (content) {
  $('.chatWindow').append(content);
}

function  printMessages(msgArray) {
  for (let i in msgArray) {
    const msg =msgArray[i];
    postMessage(msg,true);
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
    // postMessage(content, timestamp, userName);
    socket.emit('chat message', {content:content, userName: userName,
    timestamp: timeStamp});
    textbox.val('');
  });
});