angular.module('offers.controller', ['underscore'])
.controller('OffersController', function($http, _, AuthServices, OffersServices){

  this.init = function() {
    this.isAuth = AuthServices.isAuth();
    OffersServices.getAllOffers()
    .then(function(offers){
      this.offers = offers.data.games;
      if (this.isAuth) {
        //Get logged in user's offers
        this.ownOffers = _.filter(this.offers, function(game){
          return _.some(game.users, function(user) {
            return user.userid === AuthServices.getUserid();
          })
        });
      } else {
        this.ownOffers = [];
      }
    }.bind(this));
    if (this.isAuth) {
      //Get logged in user's wanted games
      OffersServices.getUserWants()
      .then(function(offers){
        this.ownSeeking = offers.data.games;
      }.bind(this));
    }
  }

  this.selectedGame = {};
  this.selectedUser = {};
  this.userWants= {};
  this.allSeekingByGame = {};
  this.gameMatches = [];

  this.selectGame = function(game) {
    this.selectedGame = game;
    this.selectedUser = {};
    this.userWants = {};
    this.gameMatches = [];
    //scroll down
    OffersServices.allWillingToSwap(game.id)
    .then(function(wants){
      this.allSeekingByGame = wants.data.games;
    }.bind(this));
  }

  this.userSeeking = function(user) {
    //Get games sought after by selected user
    this.selectedUser = user;
    this.userWants = _.filter(this.allSeekingByGame, function(seeking) {
      return seeking.userid === user.userid
    });
    if (this.isAuth){
      var ownOffers = this.ownOffers;
      this.gameMatches = _.filter(this.userWants, function(game) {
        return _.some(ownOffers, function(ownOffer) {
          return game.id === ownOffer.id;
        })
      })
      console.log("We could trade these games", this.gameMatches)
    }
  }

  this.offeredByYou = function(game) {
    return _.contains(this.gameMatches, game);
  }

  this.init();

})
