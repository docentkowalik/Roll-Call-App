(function() {
    
    var app = angular.module('rollcall', ['ngRoute','ngAnimate', 'mgcrea.ngStrap', 'mgcrea.ngStrap.collapse', 'mgcrea.ngStrap.select']);
    
    app.config(function($routeProvider) {
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/menu.html'
            })
            .when('/attendance', {
                controller: 'mainController',
                templateUrl: 'app/views/main.html'
            })
            .when('/student', {
                controller: 'studentController',
                templateUrl: 'app/views/add_student.html'
            })
            .when('/login', {
                controller: 'loginCtrl',
                templateUrl: 'app/views/login.html'
            })
            .when('/selectclassstudents', {
                controller: 'selectClassStudentsController',
                templateUrl: 'app/views/class_students.html'
            })
            .when('/rollcall/:cmd/:class_id', {
                controller: 'rollCallController',
                templateUrl: 'app/views/roll_call.html'
            })
            .when('/rollcalldone/:class_id', {
                controller: 'rollCallController',
                templateUrl: 'app/views/roll_call_done.html'
            })
            .when('/pickstudents/:pick_class_id', {
                controller: 'pickStudentsController',
                templateUrl: 'app/views/pick_students.html'
            })
            .otherwise( { redirectTo: '/' } );
    });
    
}());