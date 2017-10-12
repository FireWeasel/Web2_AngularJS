'use strict';

// NOTE: We hardcoded the task and department objects, because we had a problem with the service sync.

// Declare app level module which depends on views, and components
var module = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'myApp.dashboard',
    'myApp.version',
    'ui.bootstrap',
    'ui.calendar'
])

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

module.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
        redirectTo: '/dashboard'
    });
}])


module.service('taskService', ['$http', function($http) {
    this.getTasks = function() {
        return $http.get('http://i874156.iris.fhict.nl/WEB2/tasks');
    };
}]);

module.service('getTask', ['$http', function($http) {
    this.getHisTask = function(no) {
        return $http.get('http://i874156.iris.fhict.nl/WEB2/tasks/' + no);
    };
}]);

module.factory('myTasks', ['employeesService', function(employeesService) {
    var obj = {};
    obj.data = [];
    employeesService.getTasks()
    .then(function(response)
  {
    var tasks = response.data;

    //hardcoding this part because there are some complications with the serilization from json data format to uiCalendar format
    tasks[0].start = new Date("2016-04-15T11:08:33");
    tasks[1].start = new Date("2016-06-09T11:59:00");
    tasks[2].start = new Date("2016-05-07T18:12:00");
    tasks[3].start = new Date("2016-03-16T06:42:00");
    tasks[0].end = new Date("2016-04-15T11:08:33");
    tasks[2].end = new Date("2016-06-07T16:15:00");

      for(var i = 0; i < tasks.length; i++)
      {
        var temp  = tasks[i];
        temp.start = new Date(temp.creatioDate);
        temp.end = new Date(temp.finishedDate);
        console.log(temp.creatioDate);
        obj.data.push(temp);
      }
  },function(error){
    		console.log(error);
  });
    return obj;
}])

module.factory('TaskDepartmentEmployees', ['myTasks', 'myEmployees', 'myDepartments', function(myTasks, myEmployees, myDepartments) {

    var obj = {};
    obj.data = myTasks.data;

    for (var i = 0; i < myTasks.data.length; i++) {
        var randomNumber = Math.floor(Math.random() * myDepartments.data.length);
        myDepartments.data[randomNumber]['task'] = myTasks.data[i].description;
        myTasks.data[i]['department'] = myDepartments.data[randomNumber].Name;
        myTasks.data[i]['employees'] = [];
        var n = Math.floor((Math.random() * myEmployees.data.length - 1) + 0);
        for (var k = 0; k < n; k++) {
            myTasks.data[i]['employees'] += myEmployees.data[Math.floor(Math.random() * myEmployees.data.length)].Name;
        }
    }

    return obj;
}])

//Alex
module.service('employeesService', ['$http', function($http) {
    this.getEmployees = function() {
        return $http.get('http://i874156.iris.fhict.nl/WEB2/employees');
    };

    this.getDepartments = function() {
      return $http.get('http://i874156.iris.fhict.nl/WEB2/departments');
    };

    this.getTasks = function(){
      return $http.get('http://i874156.iris.fhict.nl/WEB2/tasks');
    };

}]);

module.service('getAnEmployee', ['$http', function($http) {
        this.getEmp = function(id) {
            return $http.get('http://i874156.iris.fhict.nl/WEB2/employees/' + id);
        };
}]);


module.factory('myEmployees', ['employeesService', function(employeesService) {
        var obj = {};

        //var employees = [];
        obj.data = [];

                employeesService.getEmployees()
                    .then(
                        function(response){
                            var tempEmployees = response.data;

                            //loop to limit $scope.employees.length to 6
                            for (var i = 0; i < tempEmployees.length; i++){

                                var temp = tempEmployees[i];
                                temp.Name = temp.firstName + " " + temp.lastName;
                                obj.data.push(temp);
                            }
                        },function(error){
                            console.log(error);
                        }
                    );



        return obj;
}]);


module.service('getDepartment', ['$http', function($http) {
        this.getHisDep = function(no) {
            return $http.get('http://i874156.iris.fhict.nl/WEB2/departments/' + no);
        };
}]);

module.service('getTitles', ['$http', function($http) {
    this.getTheTitles = function() {
        return $http.get('http://i874156.iris.fhict.nl/WEB2/titles');
    };
}]);

//Marina                'myEmployees',      myEmployees

module.service('departmentService', ['$http', function($http) {
    this.getDepartments = function() {
        return $http.get('http://i874156.iris.fhict.nl/WEB2/departments');
    };
}]);

module.factory('myDepartments', ['employeesService', function(employeesService) {
    var obj = {};
    obj.data = [];
    employeesService.getDepartments()
    .then(function(response)
  {
    var departments = response.data;
      for(var i = 0; i < departments.length; i++)
      {
        var temp  = departments[i];
        obj.data.push(temp);
      }
  },function(error){
    		console.log(error);
  });

    return obj;
}]);
