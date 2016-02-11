angular.module('offers.controller', [])
.controller('OffersController', function(AuthServices, OffersServices){
  this.isAuth = AuthServices.isAuth();

});
