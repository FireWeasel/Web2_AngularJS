
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
            	"id" : "1",
                "Name":"Management",
                "Headquarters":"New York City"
            },
            {
            	"id" : "2",
                "Name":"Sales",
                "Headquarters":"Chicago",
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
        
        $scope.AddDepartmentToList = function() {
        if($scope.inputName && $scope.inputHeadquarters && $scope.inputId) {
        $scope.departments.push({
        				"id" : $scope.inputId,
                        "Name": $scope.inputName,
                        "Headquarters": $scope.inputHeadquarters
                        })};
        }
        
        $scope.CBRemove = function() {
           var index = $scope.selectedDepartmentIndex;
           
            if (index > -1) {
               $scope.departments.splice(index, 1);
            }
        }
        
        $scope.UpdateDepartment = function(){

          var index = parseInt($scope.SelectedDepartmentUpdate) + 1;

          function checkNumber(department) {
            return department.id == index;
          }
		  $scope.departments.find(checkNumber).id = $scope.updateId;
          $scope.departments.find(checkNumber).Name = $scope.updatedInputName;
          $scope.departments.find(checkNumber).Headquarters = $scope.updatedInputHeadquarters;
        };
}]);