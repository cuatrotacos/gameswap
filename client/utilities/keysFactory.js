angular.module('keys.factory', [])

.factory('keysFactory', function($window){

  var giantBombKey = '4216ee7440e25a59a9417df44629dea10ca7e202'

  return {
    giantBombKey: giantBombKey
  }

})
