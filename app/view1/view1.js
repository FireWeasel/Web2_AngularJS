'use strict';

var myApp1 = angular.module('myApp.view1', ['ui.bootstrap', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
//, 'myEmployees'               , myEmployees
myApp1.controller('View1Ctrl', ['$scope', 'myDepartments','getDepartment','myEmployees', function($scope, myDepartments, getDepartment,myEmployees) {



    $scope.departments = myDepartments.data;
    $scope.employees = myEmployees.data;
    $scope.EmpOfDep = "none";
    $scope.EmpOfDepNames = [];
    $scope.TaskOfDep = "none";

    $scope.getEmployeeNames = function(depID)
    {
        //have to clear list because the function is called with every click of the button :)
        $scope.EmpOfDepNames = [];
        getDepartment.getHisDep(depID)
            .then(function(response){
                    $scope.EmpOfDep = response.data.employees;

                    for(var i = 0; i < $scope.EmpOfDep.length; i++)
                    {
                      for(var j = 0; j < $scope.employees.length; j++)
                      {
                        if($scope.EmpOfDep[i].no == $scope.employees[j].no)
                        {
                          $scope.EmpOfDepNames.push($scope.employees[j].Name);
                        }
                      }
                    }
            },function(error){
                            alert("Error happened in getAnEmployee service calling:     " + error);
        });
    };

    $scope.AddDepartmentToList = function() {
        if ($scope.inputName && $scope.inputCode && $scope.inputId) {
            $scope.departments.push({
                "no": $scope.inputId,
                "name": $scope.inputName,
                "code": $scope.inputCode
            });
        };
    };

    function getAllEmployees (depID){



    };

    $scope.CBRemove = function() {
        var index = $scope.selectedDepartmentIndex;

        if (index > -1) {
            $scope.departments.splice(index, 1);
        }
    };

    $scope.UpdateDepartment = function() {

        var index = $scope.SelectedDepartmentUpdate;

        $scope.departments[index].no = $scope.updateId;
        $scope.departments[index].name = $scope.updatedInputName;
        $scope.departments[index].code = $scope.updatedCode;
    };

    $scope.ViewDepartment = function() {
        var index = $scope.SelectedDepartmentView;

        $scope.viewId = $scope.departments[index].no;
        $scope.viewHeadquarters = $scope.departments[index].code;
    };


}]);

myApp1.directive('listEmps', function()
{
  return {
    template: 'Employees: <ul>    \n\
               <li ng-repeat="employee in EmpOfDepNames | limitTo: 10 "><b>   {{employee}}      </b></li>\n\
            </ul>'
  }
});

myApp1.directive('departmentDetail', function(){
  return {
    template:'<!-- Modal --> \n\
<div id="departmentModal" class="modal fade" role="dialog"> \n\
  <div class="modal-dialog"> \n\
\n\
    <!-- Modal content--> \n\
    <div class="modal-content"> \n\
      <div class="modal-header"> \n\
        <button type="button" class="close" data-dismiss="modal">&times;</button> \n\
        <h4 class="modal-title">Modal Header</h4> \n\
      </div> \n\
      <div class="modal-body"> \n\
        <p><list-emps></list-emps></p> \n\
      </div> \n\
      <div class="modal-footer"> \n\
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \n\
      </div> \n\
    </div> \n\
 \n\
  </div> \n\
</div>'
  }
});

myApp1.directive('taskModal', function(){
  return {
    template:'<!-- Modal --> \n\
<div id="taskModal" class="modal fade" role="dialog"> \n\
  <div class="modal-dialog"> \n\
\n\
    <!-- Modal content--> \n\
    <div class="modal-content"> \n\
      <div class="modal-header"> \n\
        <button type="button" class="close" data-dismiss="modal">&times;</button> \n\
        <h4 class="modal-title">Modal Header</h4> \n\
      </div> \n\
      <div class="modal-body"> \n\
        <p></p> \n\
      </div> \n\
      <div class="modal-footer"> \n\
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \n\
      </div> \n\
    </div> \n\
 \n\
  </div> \n\
</div>'
  }
});

myApp1.directive('departmentsTable', function() {
    return {
        template: '<div ng-init="checked = true"> \n\
  <div class="content-area sample-show-hide"> \n\
    <table class="table table-bordered table-hover">\n\
                    <tr class="TableDep">\n\
                        <th ng-show="checked">no</td>\n\
                        <th ng-show="checked">code</td>\n\
                        <th>name</td>\n\
                        <th ng-show="checked">Employees and Tasks</td>\n\
                    </tr>\n\
					<tr ng-repeat="department in departments | filter: filterValue">\n\
                        <td ng-show="checked">{{department.no}}</td>\n\
                        <td ng-show="checked">{{department.code}}</td>\n\
                        <td>{{department.name}}</td>\n\
                        <td ng-show="checked"><button class="btn btn-info" ng-click="getEmployeeNames(department.no)" data-toggle="modal" data-target="#departmentModal">Click me:</button></td>\n\
                    </tr>\n\
                </table> \n\
  </div> \n\
</div>'




    };
});
