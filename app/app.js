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
module.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/dashboard'});
}])


module.factory('myTasks', [function() {
  var obj = {};

  obj.data =
  [
      {"number":"1",
       "description":"Clean the kitchen",
       "completed":"Yes"
      }, {"number":"2",
       "description":"Clean the living room",
       "completed":"No"
      }, {"number":"3",
       "description":"Clean the room",
       "completed":"No"
      }, {"number":"4",
       "description":"Do the WEB2 homework",
       "completed":"Yes"
      }
  ];

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
//assignment 4.3 factory holding all of the employees
                        //'myDepartments',          myDepartments
module.factory('myEmployees', [function(){
        var obj = {};

        obj.data =
        [
            {"Name":"John Doe",
             "Occupation":"Developer",
             "State":"Ohio"
//             ,"Department":String(myDepartments.data[0].Name)
            },
            {"Name":"Catelyn Jones",
             "Occupation":"Secretary",
             "State":"Indiana"
//            ,"Department":String(myDepartments.data[0].Name)
            },
            {"Name":"Tyler Lee",
             "Occupation":"Manager",
             "State":"Washington"
//             ,"Department":String(myDepartments.data[2].Name)
            },
            {"Name":"Peter Smith",
             "Occupation":"CEO",
             "State":"New York"
//          ,"Department":String(myDepartments.data[2].Name)
            },
            {"Name":"Jack Spiker",
             "Occupation":"Lawyer",
             "State":"California"
 //            ,"Department":String(myDepartments.data[1].Name)
            }
        ];

        //4.6 assignment              Made it so a Department is assigned RANDOMLY (on every F5 full website Refresg)
//        for (var i = 0; i < obj.data.length; i++) {
//
//            var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
//            obj.data[i]['Department'] = myDepartments.data[randomNumber].Name;
//        }

        return obj;
}])

module.factory('RelationshipEmpDep', ['myEmployees', 'myDepartments', function(myEmployees, myDepartments) {

        var obj = {};
        obj.data = myDepartments.data;
        //Assigning a RANDOM department to EACH Employee
        for (var i = 0; i < myEmployees.data.length; i++) {

            var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
            myEmployees.data[i]['Department'] = myDepartments.data[randomNumber].Name;
            if(!myDepartments.data[randomNumber]['Employee'])
            {
 				 myDepartments.data[randomNumber]['Employee'] = '';
 			}
            myDepartments.data[randomNumber]['Employee'] += myEmployees.data[i].Name + " " ;
        }

        return obj;
}])


//Marina                'myEmployees',      myEmployees
module.factory('myDepartments', [function() {
        var obj = {};

        obj.data =
        [
            {
            	"id" : "1",
                "Name":"Management",
                "Headquarters":"New York City"
            },
            {
            	"id" : "2",
                "Name":"Sales",
                "Headquarters":"Chicago"
            },
            {
            	"id" : "3",
                "Name":"Marketing",
                "Headquarters":"Boston"
            },
            {
            	"id" : "4",
                "Name":"IT",
                "Headquarters":"Seattle"
            }
        ];

        return obj;
}]);
