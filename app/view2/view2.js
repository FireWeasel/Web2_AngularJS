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
        
        $scope.AddToList = function(){
            
            if ($scope.inpName && $scope.inpOccup && $scope.inpState){
                $scope.employees.push({
                        "Name": $scope.inpName,
                        "Occupation": $scope.inpOccup,
                        "State": $scope.inpState
                });
            }
            
        };
        
        //Use this if you want to remove employees from form(top)
//        $scope.RemoveFromList = function(){            
//            var index = $scope.employees.findIndex(i => i.Name === ""+$scope.inpName && i.Occupation === ""+$scope.inpOccup && i.State === ""+$scope.inpState);
//            
//            if (index > -1) {
//               $scope.employees.splice(index, 1);
//            }
//            
//        };
        
        $scope.ComboBoxRemove = function() {
           var index = $scopve.selectedEmployeeIndex1;
           
            if (index > -1) {
               $scope.employees.splice(index, 1);
            }
        };
        
//        $scope.ComboBoxUpdate = function() {
//           var index = $scope.selectedEmployeeIndex;
//           
//           
//        };

        $scope.UpdateEmployees = function(){

           var index = $scope.selectedEmployeeIndex2;
          //var aName = parseInt($scope.selectedEmployeeIndex2) + 1;

//          function checkNumber(employee) {
//            return employee.Name == aName;
//          }

          $scope.employees[index].Occupation = $scope.updatedInputDescription;
          $scope.employees[index].State = $scope.updatedInputState;
        };
        
        //not yet functional
//        $scope.ToggleState = function() {
//            //$('#btnToggleState').
//            $('.stateS').toggle("slide", { direction: "right" }, 1000);
//        };
        
        
        //Assignment week 3
        $scope.person = {
          "Name" : "John Seuss",
          "Age" : 25,
          "Hobbies" : ["Reading", "Hockey", "Horse Riding"],
          "Job": {
                "position": "Developer",
                "startDate": "01-09-2014"
          }

      };
        
}]);