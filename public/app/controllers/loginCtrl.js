
(function(){
    var loginCtrl = function($scope, $routeParams, loginFactory, appSettings,  $location,  $window){
        
        $scope.msgtxt='';
            $scope.login=function(data){
                console.log(data);
                loginFactory.loginNow(data,$scope); //call login service
            };
    };

    loginCtrl.$inject = ['$scope', '$routeParams', 'loginFactory', 'appSettings', '$location',  '$window'];
    angular.module('rollcall').controller('loginCtrl', loginCtrl);
    
}());

