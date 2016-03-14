var App = function (server) {
  this.server = server;
};

App.prototype.init = function () {

};

App.prototype.send = function (message) {
  //message should already be in the following format:
  /*
  var message = {
    username: 'shawndrost',
    text: 'trololo',
    roomname: '4chan'
  };
  */
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function() {
  var serverURL = this.server;
  $.ajax({
    url: serverURL,
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.clearMessages = function() {
  $('#chats').html('');
};

App.prototype.addMessage = function(message) {
  $('#chats').append('<div> ' + message.text + '</div>');
};

App.prototype.addRoom = function(chatroom) {
  $('#roomSelect').append('<div> ' + chatroom + '</div>');
};


var app = new App('https://api.parse.com/1/classes/messages');
