'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [ '$scope', function($scope) {
        
        $scope.employees = [
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
        
}]);