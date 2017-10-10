
'use strict';

var myApp1 = angular.module('myApp.view1', ['ui.bootstrap','ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
                                                    //, 'myEmployees'               , myEmployees
myApp1.controller('View1Ctrl', ['$scope', 'myDepartments', function($scope, myDepartments) {

		
		
                $scope.departments = myDepartments.data;
//      departmentService.getDepartments()
//		.then(function(response){
//		$scope.departments = response.data;
//		},function(error){
//		$scope.error = error;
//		}); 
                
                
                

        
        $scope.AddDepartmentToList = function() {
        if($scope.inputName && $scope.inputCode && $scope.inputId) {
        $scope.departments.push({
        				"no" : $scope.inputId,
                        "name": $scope.inputName,
                        "code": $scope.inputCode
                        });
                    };
        };
        
        $scope.CBRemove = function() {
           var index = $scope.selectedDepartmentIndex;
           
            if (index > -1) {
               $scope.departments.splice(index, 1);
            }
        };
        
        $scope.UpdateDepartment = function(){

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

myApp1.directive('departmentsTable', function(){
    return{
        template: '<div ng-init="checked = true"> \n\
  <label> \n\
    <input type="checkbox" ng-model="checked" /> \n\
    View \n\
  </label> \n\
  <div class="content-area sample-show-hide"> \n\
    <table class="table table-bordered table-hover">\n\
                    <tr class="TableDep">\n\
                        <th>no</td>\n\
                        <th ng-show="checked">code</td>\n\
                        <th ng-show="checked">name</td>\n\
                    </tr>\n\
					<tr ng-repeat="department in departments | filter: filterValue">\n\
                        <td>{{department.no}}</td>\n\
                        <td ng-show="checked">{{department.code}}</td>\n\
                        <td ng-show="checked">{{department.name}}</td>\n\
                    </tr>\n\
                </table> \n\
  </div> \n\
</div>'
        
        
        
        
      
    };
});