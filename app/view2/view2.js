'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [  '$scope',
                            'myEmployees',
                            'RelationshipEmpDep',
                            function($scope, myEmployees, RelationshipEmpDep) {
                                
        //employee list in app.js
        $scope.employees = myEmployees.data;//initializing factory
        
        $scope.departments = [];
        for (var i = 0; i < RelationshipEmpDep.data.length; i++){
            $scope.departments.push(RelationshipEmpDep.data[i].Name);    //Adding only the name of each department
        }

                                
                                
        //4.6 LOOK in app.js
                //Made it so a Department is assigned RANDOMLY (on every view2 refresh)
//                for (var i = 0; i < $scope.employees.length; i++) {
//                    var randomNumber = Math.floor(Math.random()*$scope.departments.length);
//                    $scope.employees[i]['Department'] = $scope.departments[randomNumber];
//                }
        
        
        
        $scope.AddToList = function(){
            
            if ($scope.inpName && $scope.inpOccup && $scope.inpState){
                $scope.employees.push({
                        "Name": $scope.inpName,
                        "Occupation": $scope.inpOccup,
                        "State": $scope.inpState,
                        "Department": $scope.departments[$scope.selectedDepartment]
                });
            }
            
        };
        
        $scope.ComboBoxRemove = function() {
           var index = $scope.selectedEmployeeIndex1;
           
            if (index > -1) {
               $scope.employees.splice(index, 1);
            }
        };

        $scope.UpdateEmployees = function(){

           var index = $scope.selectedEmployeeIndex2;

          $scope.employees[index].Occupation = $scope.updatedInputDescription;
          $scope.employees[index].State = $scope.updatedInputState;
          $scope.employees[index].Department = $scope.departments[$scope.updatedDepartment];
        };
        
}])



//the Employee listing is a directive
.directive('myEmployeesList', function(){
    return{
        template: '<table>\n\
                    <tr class="TopTR">\n\
                        <td ng-show="alexDetails">Index</td>\n\
                        <td>Name</td>\n\
                        <td>Occupation</td>\n\
                        <td>State</td>\n\
                        <td ng-show="alexDetails">Department</td>\n\
                    </tr>\n\
                    <tr ng-repeat="employee in employees | filter: filterValue">\n\
                        <td ng-show="alexDetails">{{$index}}</td>\n\
                        <td>{{employee.Name}}</td>\n\
                        <td>{{employee.Occupation}}</td>\n\
                        <td>{{employee.State}}</td>\n\
                        <td ng-show="alexDetails">{{employee.Department}}</td>\n\
                    </tr>\n\
                </table>'
    };
});