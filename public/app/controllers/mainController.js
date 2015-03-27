(function() {
    var mainController = function($scope, mainFactory, $routeParams, appSettings, $location, $window) {
        
        $scope.heading = appSettings.title;
        $scope.classNew = [];
        $scope.pickStudents = null;
        $scope.pickStudentsClassId;
        $scope.classTimeStart = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
                                 "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
                                 "18:00", "19:00", "20:00", "21:00"]

        mainFactory.getModuleClass()
            .success(function(response) {
                $scope.moduleClass = response;
            })
            .error(function(err) {
            });

        $scope.progs = mainFactory.getProgrammes();
        
        $scope.classStudentsProgram = [];
        $scope.toggleSelection = function toggleSelection(stud) {
            var idx = $scope.classStudentsProgram.indexOf(stud);

                // is currently selected
                if (idx > -1) {
                    $scope.classStudentsProgram.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.classStudentsProgram.push(stud);
                }
            };

        $scope.days = mainFactory.getDayOfTheWeek();


        $scope.addClass = function() {
            console.log($scope.classStudentsProgram.length);
            if ($scope.classStudentsProgram.length ==0 || !$scope.class_year || !$scope.class_name || !$scope.class_start || !$scope.class_duration ) {
                $scope.validationMSG = "All fields are required"
            }
            else{
                    $scope.classNew.push({
                    classProgram: $scope.classStudentsProgram,
                    classYear: $scope.class_year,
                    className: $scope.class_name,
                    classStarTime: $scope.class_start,
                    classDuration: $scope.class_duration,
                    classRecurring: $scope.class_recurring
                });
                console.log($scope.classNew);

                mainFactory.createNewClass($scope.classNew)
                    .success(function(responseClass) {
                        var year = responseClass[0].class_year;
                        var progR = responseClass[0].class_programme;
                        $scope.pickStudentsClassId = responseClass[0]._id;

                        mainFactory.pickClassStudents(year, progR)
                            .success(function(students) {
                                $scope.pickStudents = students;
                                $scope.pickStudentsRollCall();
                            })
                            .error(function(err) {
                            });
                    })
                    .error(function(err) {
                    });
                }
        };

        $scope.pickStudentsRollCall = function() {
            $scope.namenamename = $scope.pickStudents;

            mainFactory.createUserObject($scope.namenamename);
            $window.location.href = '#/pickstudents/' + $scope.pickStudentsClassId;
        };

        $scope.deleteClass = function(classID) {
            mainFactory.deleteClass(classID)
                .success(function(response) {
                    $scope.delRefresh();
            })
            .error(function(err) {
            });
        };

        $scope.delRefresh = function(){
            $window.location.reload();
        }
    };

    mainController.$inject = ['$scope', 'mainFactory', '$routeParams', 'appSettings', '$location', '$window'];
    angular.module('rollcall').controller('mainController', mainController);

}());