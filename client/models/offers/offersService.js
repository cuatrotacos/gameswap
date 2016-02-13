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

  var getSwappers = function(game, offers) {
    
  }

  return {
    getOffers: getOffers
  }
})
