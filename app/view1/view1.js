
'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
                                                    //, 'myEmployees'               , myEmployees
.controller('View1Ctrl', [ '$scope', 'myDepartments', 'RelationshipEmpDep', function($scope, myDepartments, RelationshipEmpDep) {
//    $scope.departments = [
//            {   
//            	"id" : "1",
//                "Name":"Management",
//                "Headquarters":"New York City"
//            },
//            {
//            	"id" : "2",
//                "Name":"Sales",
//                "Headquarters":"Chicago",
//            },
//            {
//            	"id" : "3",
//                "Name":"Marketing",
//                "Headquarters":"Boston"
//            },
//            {
//            	"id" : "4", 
//                "Name":"IT",
//                "Headquarters":"Seattle"
//            }
//        ];
        $scope.departments = myDepartments.data;
        
        
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

          var index = $scope.SelectedDepartmentUpdate;

		  $scope.departments[index].id = $scope.updateId;
          $scope.departments[index].Name = $scope.updatedInputName;
          $scope.departments[index].Headquarters = $scope.updatedInputHeadquarters;
        }

        $scope.ViewDepartment = function() {
            var index = $scope.SelectedDepartmentView;

            $scope.viewId = $scope.departments[index].id;
            $scope.viewHeadquarters = $scope.departments[index].Headquarters;
        }
}])

.directive('departmentsTable', function(){
    return{
        template: '<table>\n\
                    <tr class="TableDep">\n\
                        <td>Name</td>\n\
                        <td ng-show="viewInfo">Headquarters</td>\n\
                        <td ng-show="viewInfo">Employees</td>\n\
                    </tr>\n\
                    <tr ng-repeat="department in departments">\n\
                        <td>{{department.Name}}</td>\n\
                        <td ng-show="viewInfo">{{department.Headquarters}}</td>\n\
                        <td ng-show="viewInfo">{{department.Employee}}</td>\n\
                    </tr>\n\
                </table>'
    };
});