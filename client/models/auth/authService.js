angular.module('auth.service', [])
.factory('AuthServices', function($http, $location, $window) {

	var submitNewUser = function(userData) {
		return $http({
			method: 'POST',
			url: '/signup',
			data: userData
		}).then(function(resp) {
			$window.localStorage.setItem('com.gameswap', resp.data.token);
			$window.localStorage.setItem('com.gameswap.userid', resp.data.userid);
			return resp.data.token;
		}, function(error) {
  			console.error('Sign up ERROR!!! ', error);
		})
	};

	var getUserid = function(){
		return Number($window.localStorage.getItem('com.gameswap.userid'));
	}

	var checkSignin = function(userData){
		return $http({
			method: 'POST',
			url: '/signin',
			data: {user: userData}
		}).then(function(resp) {
			$window.localStorage.setItem('com.gameswap', resp.data.token);
			$window.localStorage.setItem('com.gameswap.userid', resp.data.userid);
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
		$window.localStorage.removeItem('com.gameswap.userid');
  	$location.path('/main');
	};

	return {
		submitNewUser: submitNewUser,
		checkSignin: checkSignin,
		isAuth: isAuth,
		signOut: signOut,
		getUserid: getUserid
	};

})
