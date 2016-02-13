angular.module('offers.services', [])

.factory('OffersServices', function($q, $http, $rootScope){

  var getOffers = function() {
    var q = $q.defer();
    $http.get($rootScope.url + "/allOfferings")
    .then(function(offers){
      q.resolve(offers);
    }, function(err){
      q.resolve(err);
    })
    return q.promise;
  }

  var getSeekingByUser = function(userid) {
    var q = $q.defer();
    $http.get($rootScope.url + "/allSeekingByUser?userid=" + userid)
    .then(function(offers){
      q.resolve(seekings);
    }, function(err){
      q.resolve(err);
    })
    return q.promise;
  }

  return {
    getOffers: getOffers
  }
})
