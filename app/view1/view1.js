
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
        
        $scope.AddDepartmentToList = function() {
        if($scope.inputName && $scope.inputHeadquarters) {
        $scope.departments.push({
                        "Name": $scope.inputName,
                        "Headquarters": $scope.inputHeadquarters
                        })};
        }
        
        $scope.CBRemove = function() {
           var index = $scope.selectedEmployeeIndex;
           
            if (index > -1) {
               $scope.departments.splice(index, 1);
            }
        };
}]);