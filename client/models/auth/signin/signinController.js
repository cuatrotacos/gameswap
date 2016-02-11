angular.module('auth.signin', [])

.controller('SigninController', function($location, $window, AuthServices){
	var user = {};
	var signin = this;

	signin.submit = function(){
		user.email = signin.email;
	 	user.password = signin.password;
	 	AuthServices.checkSignin(user)
	 		.then(function(token){
	 		    if(token){
        		    $location.path('/userprofile');
        	    } else {
        	  		console.log('Error authenticating user');
        	  		signin.email = '';
        	  		signin.password = '';
        	  		signin.isInvalid = true;
        	    }
	 		})
	 		.catch(function(error) {
        		console.error(error);	// this error never actually fires
      		});
	}
})
