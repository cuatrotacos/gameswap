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
  this.isAuth = AuthServices.isAuth();
  this.viewSeeking = false;
  this.selectedUser = {};

  this.selectGame = function(game) {
    if (this.selectedGame === game) {
      this.selectedGame = {};
    } else {
      this.selectedGame = game;
    }
    this.selectedUser = {};
  }

  this.userSeeking = function(user) {
    this.viewSeeking = true;
    this.selectedUser = user;
    console.log("Looking at seekings from", user);
    OffersServices.getSeekingByUser(user.id)
    .then(function(wants){
      console.log("++28 offersCtrl user wants", wants);
      this.userWants = wants;
    })
    //set scope variable that changes the dimensions of the page
    //Get the games that this user is seeking
    //Select the games that you are offering that match what that user is looking for
    //display a link to send a message if you're logged in
  }

  this.init();
})
