angular
  .module('main.service', [])
  .service('MainService', function($http) {
    this.searchOfferings = function(game) {
      return $http.post('/searchofferings', game)
        .then(function(resp) {
          return resp.data;
        }.bind(this), function(error) {
          throw error;
        }.bind(this));
    };
    this.searchSeeking = function(game) {
      return $http.post('/searchseeking', game)
        .then(function(resp) {
          return resp.data;
        }.bind(this), function(error) {
          throw error;
        }.bind(this));
    };
    this.addRecipient = function(recipientId, recipientName) {
      this.recipientId = recipientId;
      this.recipientName = recipientName;
    };
    this.getRecipientId = function() {
      return this.recipientId;

    };
    this.getRecipientName = function() {
      return this.recipientName;
    };
  });
