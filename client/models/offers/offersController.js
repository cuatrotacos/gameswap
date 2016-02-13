angular.module('offers.controller', [])
.controller('OffersController', function($http, AuthServices, OffersServices){

  this.init = function() {
    OffersServices.getOffers()
    .then(function(offers){
      console.log("+++line 7 offers", offers.data.offerings)
      this.offers = offers.data.offerings;
    }.bind(this));
  }

  this.selectedGame = {};

  this.test = "test"
  this.isAuth = AuthServices.isAuth();

  this.selectGame = function(game) {
    if (this.selectedGame === game) {
      this.selectedGame = {};
    } else {
      this.selectedGame = game;
      this.gameSwappers = OffersServices.getSwappers(game, this.offers);
    }
  }

  this.init();
})
