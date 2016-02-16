angular.module('userprofile', [])
  .controller('ProfileController', function($scope, AuthServices, ProfileServices){

    var userInfo = this;

    $scope.isCollapsed = true;
    this.updateClicked = false;
    $scope.getGBGamesOffer
    $scope.getGBGamesSeek
    $scope.gamesNotFoundOffer = false;
    $scope.loadingOffer = false;
    $scope.loadingSeek = false;
    $scope.gamesNotFoundSeek = false;
    $scope.droppedGamedWanted;
    $scope.droppedGamedOffered;
    $scope.centerAnchor = true;

    var loadProfile = function() {
      ProfileServices.getProfileData()
        .then(function(resp) {
          console.log("+++ 21 userprofileController.js resp: ", resp)
          userInfo.username = resp.username;
          userInfo.email = resp.email;
          userInfo.city = resp.city || 'santa monica';
          $scope.droppedGamedOffered = resp.offerings;
          $scope.droppedGamedWanted = resp.seeking;
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

    this.getGBGamesOffer = function (gameOffer) {
      $scope.loadingOffer = true;
      $scope.gamesNotFoundOffer = false;
      $scope.getGBGamesOffer = null
      var getGBGamesOffer = getGBGames(gameOffer, function (gamesFound) {
        $scope.loadingOffer = false;
        if (gamesFound.length) {
            $scope.getGBGamesOffer = gamesFound
          } else {
            $scope.gamesNotFoundOffer = true;
          }
      })
    }

    this.getGBGamesSeek = function (gameSeek) {
      $scope.loadingSeek = true;
      $scope.gamesNotFoundSeek = false;
      $scope.getGBGamesSeek = null
      var getGBGamesSeek = getGBGames(gameSeek, function (gamesFound) {
        $scope.loadingSeek = false;
        if (gamesFound.length) {
            $scope.getGBGamesSeek = gamesFound
          } else {
            $scope.gamesNotFoundSeek = true;
          }
      })
    }

  	var getGBGames = function(game, callback) {
      $scope.gamesNotFound = false;

      if(game.platform){
        ProfileServices.getgbdata({
  			  title: game.title,
  			  platform: game.platform,
          condition: game.condition
  			})
        .then(function(gbresults){
          callback(gbresults)
        });
      } else {
        console.log('ERROR: no platform chosen');
        this.noOffPlatform = true;
      }
    };

    $scope.addOffer = function(game) {
      $scope.getGBGamesOffer = null;
      $scope.loadingOffer = true;
      ProfileServices.addGameOffering(game)
      .then(function(game) {
        $scope.loadingOffer = false;
        setTimeout(loadProfile, 200);
      });
    }

    $scope.addSeek = function(game) {
      ProfileServices.addGameSeeking(game)
      .then(function(resp) {
        $scope.loadingSeek = false;
        // setTimeout(loadProfile, 200);
      });

      // if(game.platform){
      //   ProfileServices.addGameSeeking({
      //     title: game.title,
      //     platform: game.platform
      //   }).then(function(resp){
      //     setTimeout(loadProfile, 200);
      //   });
      // } else {
      //   console.log('ERROR: no platform chosen');
      //   this.noSeekPlatform = true;
      // }
  	};

  	this.signOut = function(){
  		AuthServices.signOut();
  	}

    $scope.onDroppedGamedWanted = function(data, evt){
      var index = $scope.droppedGamedWanted.indexOf(data);
      if (index == -1){
        $scope.addSeek(data);
        $scope.droppedGamedWanted.unshift(data);
      }
      console.log($scope.droppedGamedWanted, "games Wanted")
    }

    $scope.onDroppedGamedOffered = function(data, evt){
      var index = $scope.droppedGamedOffered.indexOf(data);
      if (index == -1) {
        $scope.addOffer(data);
        $scope.droppedGamedOffered.unshift(data);
      }
      console.log($scope.droppedGamedOffered, "games offered")

    }
    $scope.onDragSuccess1=function(data,evt){
      var index = $scope.droppedGamedWanted.indexOf(data);
      if (index > -1) {
          $scope.droppedGamedWanted.splice(index, 1);
      }
      console.log($scope.droppedGamedWanted, "games Wanted")
    }

    $scope.onDragSuccess2=function(data,evt){
      var index = $scope.droppedGamedOffered.indexOf(data);
      if (index > -1) {
          $scope.droppedGamedOffered.splice(index, 1);
      }
      console.log($scope.droppedGamedOffered, "games offered")
    }

    $scope.toggleCenterAnchor = function () {
      $scope.centerAnchor = !$scope.centerAnchor
    }

    loadProfile();

  })
