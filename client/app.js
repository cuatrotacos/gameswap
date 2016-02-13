angular
  .module('app', [
  	'main.controller',
  	'main.service',
  	'userprofile',
  	'profile.service',
  	'auth.signin',
  	'auth.signup',
  	'auth.service',
  	'ui.router',
    'ui.bootstrap',
    'messages.controller',
    'messages.service',
    'navbar.controller',
    'navbar.services',
    'offers.controller',
    'offers.services',
    'keys.factory'
    ])

  .config(function($stateProvider, $urlRouterProvider, $httpProvider){

	  $urlRouterProvider.otherwise('/');

	  $stateProvider
		  .state('main', {
			  url: '/',
        views: {
          "": {
            templateUrl: './models/main/main.html'
          },
          "navbar" : {
            templateUrl: './models/navbar/navbar.html'
          }
        }
		  })
      .state('offers', {
        url: '/offers',
        views: {
          "": {
            templateUrl: './models/offers/offers.html'
          },
          "navbar" : {
            templateUrl: './models/navbar/navbar.html'
          }
        }
      })
		  .state('signin', {
			  url: '/signin',
        views: {
          "": {
            templateUrl: './models/auth/signin/signin.html'
          },
          "navbar" : {
            templateUrl: './models/navbar/navbar.html'
          }
        }
		  })
		  .state('signup', {
			  url: '/signup',
        views: {
          "": {
            templateUrl: './models/auth/signup/signup.html'
          },
          "navbar" : {
            templateUrl: './models/navbar/navbar.html'
          }
        }
		  })
		  .state('userprofile', {
			  url: '/userprofile',
        views: {
          "": {
            templateUrl: './models/userprofile/userprofile.html'
          },
          "navbar" : {
            templateUrl: './models/navbar/navbar.html'
          }
        },
        authenticate: true
		  })
      .state('messages', {
        url: '/messages',
        views: {
          "": {
            templateUrl: './models/messages/messages.html'
          },
          "navbar" : {
            templateUrl: './models/navbar/navbar.html'
          }
        },
        authenticate: true
      });

	  $httpProvider.interceptors.push('AttachTokens');

})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.gameswap');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, AuthServices) {
  //Use local server
  $rootScope.url = "http://localhost:3000";

  $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !AuthServices.isAuth()) {
      e.preventDefault();
      $location.path('/signin');
    }
  });
});
