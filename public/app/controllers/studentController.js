
(function(){
    var studentController = function($scope, $routeParams, mainFactory, appSettings,  $location,  $window){
        
            $scope.addStudent=function(student){ 
                console.log(student);

                var firstname = student.firstname;
                var lastname = student.lastname;
                var number = student.studentNumber;
                var program = student.prog;
                var year = student.yr;

                if (!firstname || !lastname || !number || !program || !year) {
                  $scope.validationMSG = "All fields are required"
                }
                else{

                    mainFactory.addStudent(student)
                    .success(function(response){
                      console.log(response);
                      if (response == "studentadded") {
                          $window.location.href = '#/';
                      }
                      else{
                          $window.location.reload();
                      }
                    })
                    .error(function(err){        
                    });
                }
            };
    };

    studentController.$inject = ['$scope', '$routeParams', 'mainFactory', 'appSettings', '$location',  '$window'];
    angular.module('rollcall').controller('studentController', studentController);
    
}());

