'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])



//factory holding all of the employees
.factory('myEmployees', [function(){
        var obj = {};
        obj.data = [
            {"Name":"John Doe",
             "Occupation":"Developer",
             "State":"Ohio"        
            },{"Name":"Catelyn Jones",
             "Occupation":"Secretary",
             "State":"Indiana"        
            },{"Name":"Tyler Lee",
             "Occupation":"Manager",
             "State":"Washington"        
            },{"Name":"Peter Smith",
             "Occupation":"CEO",
             "State":"New York"        
            },{"Name":"Jack Spiker",
             "Occupation":"Lawyer",
             "State":"California"        
            }
        ];
        return obj;
}]);
