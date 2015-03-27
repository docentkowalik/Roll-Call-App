(function(){
    var pickStudentsController = function($scope, $routeParams, mainFactory, appSettings,  $location,  $window){
        
      var classID = $routeParams.pick_class_id;
      
      $scope.listOfStudents = mainFactory.returnUserObject();
      
      $scope.pickStudentsAll = [];
      var currentLoop = 0; 
      var studGroup = $scope.listOfStudents[currentLoop][0].students;

      function getGroup() {
        $scope.pickStudentsAll.push(studGroup);
        
        if (currentLoop <  $scope.listOfStudents.length-1) {
            currentLoop++;
            console.log(currentLoop)
            studGroup = $scope.listOfStudents[currentLoop][0].students
            getGroup();
        }
        else {
            console.log($scope.pickStudentsAll);
        }
      }
      getGroup();

      
      $scope.selection=[];
      $scope.toggleSelection = function toggleSelection(classStudent) {
        var idx = $scope.selection.indexOf(classStudent);

        if (idx > -1) {
          $scope.selection.splice(idx, 1);
        }
        else {
          $scope.selection.push(classStudent);
        }
      };

     $scope.saveClassStudents = function () {

      var studs = $scope.selection;
      $scope.arrayOfStudentObjects = [];

      for (s = 0; s < studs.length; ++s) {
          console.log(studs[s]);
          var obj = {studentNumber:studs[s]}
          $scope.arrayOfStudentObjects.push(obj);

          console.log(obj);
      }

      mainFactory.saveClassStudents(classID, $scope.arrayOfStudentObjects)
        .success(function(response){
          console.log(response);
          $scope.saveDone();
        })
        .error(function(err){
        });
      };

    $scope.saveDone = function () {
      $window.location.href = '#/attendance';
    };
  };

    pickStudentsController.$inject = ['$scope', '$routeParams', 'mainFactory', 'appSettings', '$location',  '$window'];
    angular.module('rollcall').controller('pickStudentsController', pickStudentsController);
    
}());

