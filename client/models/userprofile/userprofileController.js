angular.module('userprofile', [])
  .controller('ProfileController', function($scope, AuthServices, ProfileServices){

    var userInfo = this;

    this.gamesOffered = [];
    this.gamesSeeking = [];
    this.updateClicked = false;
    $scope.gbgames = []
    var loadProfile = function() {
      ProfileServices.getProfileData()
        .then(function(resp) {
          userInfo.username = resp.username;
          userInfo.email = resp.email;
          userInfo.city = resp.city || 'santa monica';
          userInfo.gamesOffered = resp.offerings;
          userInfo.gamesSeeking = resp.seeking;
        });
    };

    this.toggleUpdate = function(){
      if(!this.updateClicked) {
        this.updateClicked = true;
      } else {
        this.updateClicked = false;
      }
    };

    this.submitUpdate = function(update) {
      ProfileServices.updateProfile(update)
        .then(function(resp){

          setTimeout(loadProfile, 200);

        });
      this.toggleUpdate();
    };

  	this.getGBGames = function(game) {
      var platform = "PS4"
      if(game.platform === "Xbox One"){
        platform = "XONE"
      }
      if(game.platform){
        ProfileServices.getgbdata({
  			  title: game.title,
  			  platform: platform,
          condition: game.condition
  			}).then(function(gbresults){
          $scope.gbgames = gbresults

        });
      } else {
        console.log('ERROR: no platform chosen');
        this.noOffPlatform = true;
      }
    };

    this.addOffer = function(game) {
      $scope.gbgames = [];
      ProfileServices.addGameOffering(game);
    }

    this.addSeek = function(game) {
      if(game.platform){
        ProfileServices.addGameSeeking({
          title: game.title,
          platform: game.platform
        }).then(function(resp){
          setTimeout(loadProfile, 200);
        });
      } else {
        console.log('ERROR: no platform chosen');
        this.noSeekPlatform = true;
      }
  	};

  	this.signOut = function(){
  		AuthServices.signOut();
  	}

    loadProfile();

  })
