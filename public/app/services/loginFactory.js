(function(){

    var loginFactory = function($http, appSettings){
 
    	return{
			loginNow:function(data,scope){
				console.log(data);
				console.log(scope.msgtxt);

				var user = "user";
				var pass = "pass";

				if (data.user != user) {
					console.log("User Doesn't Exist");
					scope.msgtxt='User doesn\'t exist';
				}
				else {
						if (data.pass == pass){
							console.log("Logged in");
						}
						else{
							console.log("Wrong password");
							scope.msgtxt="Wrong password"
						}
				};
			}
		}
    };
    
    loginFactory.$inject = ['$http', 'appSettings'];
    angular.module('rollcall').factory('loginFactory', loginFactory)
}());