(function(){
    var rollCallController = function($scope, $routeParams, mainFactory, appSettings,  $location,  $window){
        
      var classID = $routeParams.class_id;
      $scope.cmd = $routeParams.cmd;
      $scope.classStudents = null;

      mainFactory.getClassStudents(classID)
        .success(function(response){
          $scope.classStudents = response;
          console.log($scope.classStudents);
          console.log(response);
        })
        .error(function(err){        
        });

      $scope.selection=[];
      $scope.toggleSelection = function toggleSelection(employeeName) {
        var idx = $scope.selection.indexOf(employeeName);

        if (idx > -1) {
          $scope.selection.splice(idx, 1);
        }
        else {
          $scope.selection.push(employeeName);
        }
      };

      $scope.takeRollCall = function () {
        mainFactory.takeRollCall(classID, $scope.selection, $scope.cmd)
          .success(function(response){     
              console.log(response);
              
              if (response == "updated") {
                  $window.location.href = '#/attendance';
              }
              else{
                  $scope.rollcalldone();
              }
          })
          .error(function(err){  
          });
      };

      $scope.rollcalldone = function () {
        $window.location.href = '#/rollcalldone/' + classID;
        $scope.currentRollCallID = classID;
      };
     
     $scope.latecomer = function () {
      $window.location.href = '#/rollcall/' + "late" + '/' + classID;
    };
  };
    
    rollCallController.$inject = ['$scope', '$routeParams', 'mainFactory', 'appSettings', '$location',  '$window'];
    angular.module('rollcall').controller('rollCallController', rollCallController);
    
}());

