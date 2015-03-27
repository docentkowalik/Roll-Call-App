(function(){

    var mainFactory = function($http, appSettings){
        var listOfColours;
        var globalStudentsObject;

        var d = new Date();
          var weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";
          var day = weekday[d.getDay()];

        var programmes = [
          {
            val: 'Creative Multimedia',
            label: 'Creative Multimedia'
          },
          {
            val: 'Digital Animation Production',
            label: 'Digital Animation Production'
          }
        ];

      var factory = {};
      var opt = {withCredentials:false};


      factory.getProgrammes = function(){
        return programmes;
      };    

      factory.createUserObject = function(obj){
        globalStudentsObject= obj;
        console.log(globalStudentsObject);
      };    

      factory.returnUserObject = function(obj){
        return globalStudentsObject;
      };    

      factory.getDayOfTheWeek = function(){
        return day;
      };
        
      factory.getModuleClass = function(){
        return $http.get(appSettings.serverEndpoint+'/getModuleClass', opt);
      };

      factory.getClassStudents = function(classID){
        return $http.get(appSettings.serverEndpoint+'/getClassStudents/' + classID, opt);
      };

      factory.takeRollCall = function(class_id, students, cmd) {
        return $http.post(appSettings.serverEndpoint+'/takeRollCall', {rollClassID:class_id, rollClassStudents:students, cmd:cmd}, opt);
      };

      factory.createNewClass = function(newClass) {
        return $http.post(appSettings.serverEndpoint+'/createNewClass', {newclass:newClass}, opt);
      };

      factory.pickClassStudents = function(year, progR) {
        return $http.post(appSettings.serverEndpoint+'/pickClassStudents', {yr:year, prg:progR}, opt);
      };

      factory.saveClassStudents = function(classid, students) {
        console.log(classid);
        console.log(students);
          return $http.post(appSettings.serverEndpoint+'/saveClassStudents', {classID:classid, studentsObject:students}, opt);
      };

      factory.deleteClass = function(classid) {
        console.log(classid);
          return $http.post(appSettings.serverEndpoint+'/deleteClass', {classID:classid}, opt);
      };

      factory.addStudent = function(student) {
        console.log(student);
          return $http.post(appSettings.serverEndpoint+'/addStudent', {newStudent:student}, opt);
      };

      
      return factory;
    };
    
    mainFactory.$inject = ['$http', 'appSettings'];
    angular.module('rollcall').factory('mainFactory', mainFactory)
}());