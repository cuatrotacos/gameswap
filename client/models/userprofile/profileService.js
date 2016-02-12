angular.module('profile.service', [])

.factory('ProfileServices', function($http, $window, keysFactory){

	var getProfileData = function(){
		var token = $window.localStorage.getItem('com.gameswap');

		return $http({
			method: 'POST',
			url: '/profile',
			data: {token: token}
		})
		.then(function(resp){
			return resp.data;
		}, function(error) {
			console.error('ERROR in getProfileData: ', error);
		})
	};

	var getgbdata = function (userGame) {
		var url = 'http://www.giantbomb.com/api/search/?api_key=' + keysFactory.giantBombKey + '&format=json&query=' + userGame.title +'&resources=game'

	  return $http({
	  	method: 'JSONP',
	  	url: url,
	  	params: {
	  		format: 'jsonp',
	  		json_callback: 'JSON_CALLBACK'
	  	}
		})
	  .then(function (gbresults) {
	  	var gameResults = {};
	  	var gameArray = [];
	  	_.each(gbresults.data.results, function(game){
	  	  _.each(game.platforms, function (platform) {
	  	    if (platform.abbreviation === userGame.platform) {
	  	    	game.userPlatform = userGame.platform;
	  	      gameResults[game.name] = game
	  	    }
	  	  })
	  	})
	    for(var key in gameResults){
	      gameArray.push(gameResults[key])
	    }
	    return gameArray
	  })
	}

	var addGameOffering = function(game){
		var token = $window.localStorage.getItem('com.gameswap');
		return $http({
			method: 'POST',
			url: '/addtoofferings',
			data: {game: game, token: token}
		})
		.then(function(resp){
			return resp;
		}, function(error) {
			console.error('ERROR!!! ', error);
		})

	};

	var addGameSeeking = function(game){
		var token = $window.localStorage.getItem('com.gameswap');

		return $http({
			method: 'POST',
			url: '/addtoseeking',
			data: {game: game, token: token}
		})
		.then(function(resp){
			return resp;
		}, function(error) {
			console.error('ERROR!!! ', error);
		})
	};

	var updateProfile = function(data){
		var update = {
			phone: data.phone || "",
			street: data.street || "",
			city: data.city || "",
			state: data.state || "",
			zip: data.zip || "",
			geoloc: data.geoloc || "",
			profilepic: data.profilepic || ""
		};

		var token = $window.localStorage.getItem('com.gameswap');

		return $http({
			method: 'PUT',
			url: '/profile/update',
			data: {user: update,
				token: token}
			})
			.then(function(resp){
				return resp;
			}, function(error) {
				console.error('ERROR!!! ', error);
			});
	};

	return {
		getgbdata: getgbdata,
		getProfileData: getProfileData,
		addGameOffering: addGameOffering,
		addGameSeeking: addGameSeeking,
		updateProfile: updateProfile
	};
});
