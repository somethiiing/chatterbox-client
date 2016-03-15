var App = function (server) {
  this.server = server;
  this.username = '';
  this.data = null;
};

App.prototype.init = function () {
  this.clearMessages();
  $('#send .submit').submit(this.handleSubmit.bind(this));
  $('.username').on('click', this.addFriend);
  var username = window.location.search.match(/.+username=([^&]+)/);
  if (!username) {
    this.username = 'anonymous';
  } else {
    this.username = username[1];
  }
  this.fetch();
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
  var addMessage = this.addMessage;
  $.ajax({
    url: serverURL,
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Messages fetched: ', data);
      data.results.forEach(addMessage);
      _.uniq(data.results.map(function(message) {
        return message.username;
      })).forEach(function(username) {
        $('.participants').append('<div class="username">' + username + '</div>');
      });
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages', data);
    }
  });
};

App.prototype.clearMessages = function() {
  $('#chats').html('');
  $('.participants').html('');
};

App.prototype.addMessage = function(message) {
  $('#chats').append('<div>' + 
    '<span class="timestamp">' + timeStamp(message.createdAt) + '</span>' + 
    '<span class="username">' + escapeHtml(message.username) + '</span>: ' + 
    '<span class="messagetext">' + escapeHtml(message.text) + '</span>' + 
    '</div>');

  //if (!$('#main').find('.username:contains('' + message.username + '')')) {
  //$('#main').append('<div class='username'>' + message.username + '</div>');
  //}

};

App.prototype.addFriend = function() {
  console.log('addFriend');
};

App.prototype.addRoom = function(chatroom) {
  $('#roomSelect').append('<div> ' + chatroom + '</div>');
};

App.prototype.handleSubmit = function() {
  var message = {
    username: this.username,
    text: $('#message').val(),
    roomname: 'lobby'
  };

  this.send(message);
};

 var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

var escapeHtml = function(string) {
      return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
};

var timeStamp = function(inputDate) {
  inputDate = new Date(inputDate);
  var year = (inputDate.getFullYear()) - 2000;
  var month = (inputDate.getMonth()) + 1;
  if (month < 10) {
    month = '0' + month.toString();
  }
  var day = inputDate.getDate();
  var hours = inputDate.getHours();
  var AMorPM;
  if (hours >= 12) {
    if (hours > 12) {
      hours -= 12;
    }
    AMorPM = 'pm';
  } else {
    if ( hours === 0) {
      hours = 12;
    } else if (hours < 10) {
      hours = '0' + hours.toString();
    }
    AMorPM = 'am';
  }
  var minutes = inputDate.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes.toString();
  }
  var seconds = inputDate.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds.toString();
  }
  return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + AMorPM + ' ';
};


var app = new App('https://api.parse.com/1/classes/messages');

// setInterval(function() {
//   app.init(); 
// }, 1500);

app.init();
