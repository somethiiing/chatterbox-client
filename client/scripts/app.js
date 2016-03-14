var App = function (){

};

App.prototype.init = function () {

};

App.prototype.send = function (message) {
  $.ajax('http://www.willfulbard.com', {type: 'POST'});

};

var app = new App();
