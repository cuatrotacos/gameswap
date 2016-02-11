angular.module('navbar.controller', [])
.controller('NavbarController', function(AuthServices) {
  this.isAuth = AuthServices.isAuth();

  this.signOut = function(){
    AuthServices.signOut();
  };
});
