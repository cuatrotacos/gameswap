angular.module('offers.controller', ['underscore'])
.controller('OffersController', function($http, _, AuthServices, OffersServices){

  this.init = function() {
    OffersServices.getOffers()
    .then(function(offers){
      this.offers = offers.data.offerings;
    }.bind(this));
  }
  this.selectedGame = {};
  this.isAuth = AuthServices.isAuth();
  this.selectedUser = {};
  this.userWants= {};
  this.allSeekingsByGame = {};

  this.selectGame = function(game) {
    this.selectedGame = game;
    this.selectedUser = {};
    this.userWants = {};
    //scroll down
    OffersServices.allWillingToSwap(game.id)
    .then(function(wants){
      console.log("+++22 OffersCtrl would swap for these games:", wants)
      this.allSeekingsByGame = wants.data.games;
    }.bind(this));
  }

  this.userSeeking = function(user) {
    this.selectedUser = user;
    this.userWants = _.filter(this.allSeekingsByGame, function(seeking) {
      return seeking.userid === user.id
    });
    //this is or is not working.
    console.log("+++33 user", user.username, "wants", this.userWants)
  }

    // console.log("Looking at seekings from", user);
    // OffersServices.getSeekingByUser(user.id)
    // .then(function(wants){
    //   this.userWants = wants.data.games;
    //   console.log("++28 offersCtrl userWants", this);
    // }.bind(this))
    //set scope variable that changes the dimensions of the page
    //Get the games that this user is seeking
    //Select the games that you are offering that match what that user is looking for
    //display a link to send a message if you're logged in
  // }

  this.init();
})
