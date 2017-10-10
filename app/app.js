'use strict';

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
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}])


module.service('taskService', ['$http', function($http){
	this.getTasks = function(){
	return $http.get('http://i874156.iris.fhict.nl/WEB2/tasks');
	};
}]);

module.factory('myTasks', ['taskService', function(taskService) {
  var obj = {};

 		taskService.getTasks()
		.then(function(response){
		obj.data = response.data;
		},function(error){
		console.log(error);
		}); 

  return obj;
}])

module.factory('TaskDepartmentEmployees', ['myTasks', 'myEmployees', 'myDepartments', function(myTasks, myEmployees, myDepartments) {

  var obj = {};
  obj.data = myTasks.data;

  for (var i = 0; i < myTasks.data.length; i++) {
    var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
    myDepartments.data[randomNumber]['task'] = myTasks.data[i].description;
    myTasks.data[i]['department'] = myDepartments.data[randomNumber].Name;
    myTasks.data[i]['employees'] = [];
    var n = Math.floor((Math.random()*myEmployees.data.length-1)+0);
    for(var k = 0; k < n; k++) {
      myTasks.data[i]['employees'] += myEmployees.data[Math.floor(Math.random()*myEmployees.data.length)].Name;
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

module.service('testService', ['$http', function($http) {
        this.getEmp = function(id) {
            return $http.get('http://i874156.iris.fhict.nl/WEB2/employees/' + id);
        };
}]);


module.factory('myEmployees', ['employeesService', function(employeesService) {
        var obj = {};
        
        //var employees = [];
        obj.data = [];  
        
                employeesService.getEmployees()
                    .then(function(response){
                        var tempEmployees = response.data;
                        
                        //loop to limit $scope.employees.length to 6
                        for (var i = 0; i < 8; i++){
                            
                            var temp = tempEmployees[i];
                            temp.Name = temp.firstName + " " + temp.lastName;
                            
//                            var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
//                            temp.Department = myDepartments.data[randomNumber].Name;
                            
                            obj.data.push(temp);                            
                        }
                    
                    },function(error){
                        console.log(error);
                    });        
             
              
        
        return obj;
}])
                        //'myDepartments',          myDepartments
//module.factory('myEmployees', [function(){
//        var obj = {};
//
//                //leaving factory for other factories
//        obj.data =
//        [
//            {"Name":"John Doe",
//             "Occupation":"Developer",
//             "State":"Ohio"
////             ,"Department":String(myDepartments.data[0].Name)
//            },
//            {"Name":"Catelyn Jones",
//             "Occupation":"Secretary",
//             "State":"Indiana"
////            ,"Department":String(myDepartments.data[0].Name)
//            },
//            {"Name":"Tyler Lee",
//             "Occupation":"Manager",
//             "State":"Washington"
////             ,"Department":String(myDepartments.data[2].Name)
//            },
//            {"Name":"Peter Smith",
//             "Occupation":"CEO",
//             "State":"New York"
////          ,"Department":String(myDepartments.data[2].Name)
//            },
//            {"Name":"Jack Spiker",
//             "Occupation":"Lawyer",
//             "State":"California"
// //            ,"Department":String(myDepartments.data[1].Name)
//            }
//        ];
//
//        //4.6 assignment              Made it so a Department is assigned RANDOMLY (on every F5 full website Refresg)
////        for (var i = 0; i < obj.data.length; i++) {
////
////            var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
////            obj.data[i]['Department'] = myDepartments.data[randomNumber].Name;
////        }
//
//        return obj;
//}])

//module.factory('RelationshipEmpDep', ['myEmployees', 'myDepartments', function(myEmployees, myDepartments) {
//
//        var obj = {};
//        obj.data = myDepartments.data;
//        
//        
//        //Assigning a RANDOM department to EACH Employee
//        
//        
//        //assigning department on index 1
//        for (var i = 0; i < myEmployees.data.length; i++) {
//
//            //var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
//            var randomNumber = 1;
//            myEmployees.data[i]['Department'] = myDepartments.data[randomNumber].Name;
//           
////            if(!myDepartments.data[randomNumber]['Employee'])
////            {
////                    myDepartments.data[randomNumber]['Employee'] = '';
////            }
////            myDepartments.data[randomNumber]['Employee'] += myEmployees.data[i].Name + " " ;
//        }
//
//        return obj;
//}])


//Marina                'myEmployees',      myEmployees

module.service('departmentService', ['$http', function($http){
			var temp = {};
			this.getDepartments = function() {
            return $http.get('http://i874156.iris.fhict.nl/WEB2/departments')
            .success(function(data) {
			temp = data;
        });
    }
}]);     
            
module.factory('myDepartments', ['departmentService', function(departmentService) {
        var obj = {};
        
        departmentService.getDepartments()
		.then(function(response){
			obj.data = response.data;
		},function(error){
			console.log(error);
		}); 
        
        return obj;
}]);
