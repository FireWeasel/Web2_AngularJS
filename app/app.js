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
        redirectTo: '/view1'
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
    employeesService.getTasks().then(function(response)
    {
      var tasks = response.data;

      for(var i = 0; i < tasks.length; i++)
      {
        var temp  = tasks[i];
        if(temp.creatioDate != null) {
            temp.start = new Date(temp.creatioDate.replace(" ", "T"));
        }
        if(temp.finishedDate != null) {
          temp.end = new Date(temp.finishedDate.replace(" ", "T"));
        }
        delete temp.creatioDate;
        delete temp.finishedDate;
        obj.data.push(temp);
      }
  },function(error){
    		console.log(error);
  });
    console.log(obj);
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
                                temp.newDepartment = [];
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
