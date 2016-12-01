'use strict';
const socket = io();
$('form').submit(function(){
  console.log(' sub');
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});