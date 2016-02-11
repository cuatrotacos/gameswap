angular
  .module('messages.service', [])
  .service('MessagesService', function($http, $window) {
    this.sendMessage = function(message) {
      var token = $window.localStorage.getItem('com.gameswap');
      return $http.post('/addmessage', {message: message, token: token})
        .then(function(resp) {
          return resp.data;
        }.bind(this), function(error) {
          throw error;
        }.bind(this));
    };
    this.getMessages = function() {
      var token = $window.localStorage.getItem('com.gameswap');
      return $http.get('/getmessages', {token: token})
        .then(function(resp) {
          return resp.data;
        }.bind(this), function(error) {
          throw error;
        }.bind(this));
    };
  });
