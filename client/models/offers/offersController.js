angular.module('offers.controller', [])
.controller('OffersController', function($http, AuthServices, OffersServices){

  this.init = function() {
    OffersServices.getOffers()
    .then(function(offers){
      console.log("+++line 7 offers", offers.data.offerings)
      this.offers = offers.data.offerings;
      debugger;
    });
  }
  this.test = "test"

  this.isAuth = AuthServices.isAuth();

  this.selectGame = function(){};

  this.init();
});
