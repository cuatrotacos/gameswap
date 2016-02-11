angular.module('auth.service', [])
.factory('AuthServices', function($http, $location, $window) {

	var submitNewUser = function(userData) {
		return $http({
			method: 'POST',
			url: '/signup',
			data: userData
		}).then(function(resp) {
			$window.localStorage.setItem('com.gameswap', resp.data.token);
			return resp.data.token;
		}, function(error) {
  			console.error('Sign up ERROR!!! ', error);
		})
	};

	var checkSignin = function(userData){
		return $http({
			method: 'POST',
			url: '/signin',
			data: {user: userData}
		}).then(function(resp) {
			$window.localStorage.setItem('com.gameswap', resp.data.token);
			return resp.data.token;
		}).catch(function(error) {
  			console.error('Sign in ERROR!!!', error);
		})
	};

	var isAuth = function () {
    	return !!$window.localStorage.getItem('com.gameswap');
  	};

	var signOut = function () {
  	$window.localStorage.removeItem('com.gameswap');
  	$location.path('/main');
	};

	return {
		submitNewUser: submitNewUser,
		checkSignin: checkSignin,
		isAuth: isAuth,
		signOut: signOut
	};

})
