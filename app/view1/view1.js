
'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', function($scope) {
    $scope.departments = [
            {   
                "Name":"Management",
                "Headquarters":"New York City"
            },
            {
                "Name":"Sales",
                "Headquarters":"Chicago",
            },
            {
                "Name":"Marketing",
                "Headquarters":"Boston"
            },
            {
                "Name":"IT",
                "Headquarters":"Seattle"
            }
        ];
}]);