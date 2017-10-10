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

module.factory('myTasks', ['taskService', function(taskService) {
    var obj = {};

    //  		taskService.getTasks().then(function(response){
    obj.data = [{
        "no": 1,
        "deptNo": 5,
        "title": "Implement webservice for clients",
        "description": "Create an API as a webservice for our clients to access their order information.",
        "status": "In progress",
        "end": null,
        "modificationDate": null,
        "start": new Date("2016-04-15T11:08:33")
    }, {
        "no": 2,
        "deptNo": 1,
        "title": "Send invoice to client",
        "description": "Draft an invoice and when it's approved send it to the client.\r\n\r\nNote: Check with Kyoichi if the content of the invoice is correct!",
        "status": "In progress",
        "end": null,
        "modificationDate": null,
        "start": new Date("2016-06-09T11:59:00")
    }, {
        "no": 3,
        "deptNo": 6,
        "title": "Test application Sigma",
        "description": "Do alpha testing for the application Sigma. There is a precompiled test plan that should be followed and filled in.\r\n\r\nPlease send the test report to the development department after the tests are finished.",
        "status": "Finished",
        "end": new Date("2016-06-07T16:15:00"),
        "modificationDate": "2016-06-07 16:15:00",
        "start": new Date("2016-05-07T18:12:00")
    }, {
        "no": 4,
        "deptNo": 3,
        "title": "Meeting employee Patricio Bridgland",
        "description": "Patricio Bridgland requested a meeting to talk about the new position as Technique Leader within the company.",
        "status": "Paused",
        "end": null,
        "modificationDate": "2016-05-31 12:10:00",
        "start": new Date("2016-03-16T06:42:00")
    }];
    console.log(obj.data);
    // 		},function(error){
    // 			console.log(error);
    // 		});

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

module.factory('myDepartments', ['departmentService', function(departmentService) {
    var obj = {};

    //         departmentService.getDepartments()
    // 		.then(function(response){
    obj.data = [{
        "no": 1,
        "code": "d001",
        "name": "Marketing"
    }, {
        "no": 2,
        "code": "d002",
        "name": "Finance"
    }, {
        "no": 3,
        "code": "d003",
        "name": "Human Resources"
    }, {
        "no": 4,
        "code": "d004",
        "name": "Production"
    }, {
        "no": 5,
        "code": "d005",
        "name": "Development"
    }, {
        "no": 6,
        "code": "d006",
        "name": "Quality Management"
    }, {
        "no": 7,
        "code": "d007",
        "name": "Sales"
    }, {
        "no": 8,
        "code": "d008",
        "name": "Research"
    }, {
        "no": 9,
        "code": "d009",
        "name": "Customer Service"
    }];
    // 		},function(error){
    // 			console.log(error);
    // 		});

    return obj;
}]);
