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

  var allWillingToSwap = function(gameid) {
    var q = $q.defer();
    $http.get($rootScope.url + "/allWillingToSwap?gameid=" + gameid)
    .then(function(wants){
      q.resolve(wants);
    }, function(err){
      q.resolve(err);
    })
    return q.promise;
  }

  // var getSeekingByUser = function(userid) {
  //   var q = $q.defer();
  //   $http.get($rootScope.url + "/allSeekingByUser?userid=" + userid)
  //   .then(function(wants){
  //     q.resolve(wants);
  //   }, function(err){
  //     q.resolve(err);
  //   })
  //   return q.promise;
  // }

  return {
    getOffers: getOffers,
    // getSeekingByUser: getSeekingByUser,
    allWillingToSwap: allWillingToSwap
  }
})
