
'use strict';

var myApp1 = angular.module('myApp.view1', ['ui.bootstrap','ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
                                                    //, 'myEmployees'               , myEmployees
myApp1.controller('View1Ctrl', [ '$scope', 'departmentService', 'myEmployees', function($scope, departmentService, myEmployees) {
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
		/*departmentService.getDepartments()
		.then(function(response){
		$scope.departments = response.data;
		}, function(error){
		$scope.error = error;
		});*/
		
                departmentService.getDepartments()
		.then(function(response){
		$scope.departments = response.data;
		},function(error){
		$scope.error = error;
		}); 
                
                
                
                //after you fix your factory add something in it like this so each department gets connected to an employee
//                var employees = myEmployees.data;
//                        
//                for (var i = 0; i < $scope.departments.length; i++){
//                       
//                    for (var j = 0; j < employees.length; i++){                            
//                        if ($scope.departments[i].name === employees[j].Department){
//                                $scope.department.Employees += " - " + employees[j].Name;
//                        }
//                    }
//                }    
        
        $scope.AddDepartmentToList = function() {
        if($scope.inputName && $scope.inputCode && $scope.inputId) {
        $scope.departments.push({
        				"no" : $scope.inputId,
                        "name": $scope.inputName,
                        "code": $scope.inputCode
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

		  $scope.departments[index].no = $scope.updateId;
          $scope.departments[index].name = $scope.updatedInputName;
          $scope.departments[index].code = $scope.updatedCode;
        }

        $scope.ViewDepartment = function() {
            var index = $scope.SelectedDepartmentView;

            $scope.viewId = $scope.departments[index].no;
            $scope.viewHeadquarters = $scope.departments[index].code;
        }
        
        //some properties that are not working
          	/*$scope.isNavCollapsed = true;
  			$scope.isCollapsed = false;
  			$scope.isCollapsedHorizontal = false;*/
  			
}])

myApp1.directive('departmentsTable', function(){
    return{
        template: '<div ng-init="checked = true"> \n\
  <label> \n\
    <input type="checkbox" ng-model="checked" /> \n\
    View \n\
  </label> \n\
  <div class="content-area sample-show-hide"> \n\
    <table class="table table-bordered">\n\
                    <tr class="TableDep">\n\
                        <td>no</td>\n\
                        <td ng-show="checked">code</td>\n\
                        <td ng-show="checked">name</td>\n\
         <!--               <td>Employees</td>-->\n\
                    </tr>\n\
					<tr ng-repeat="department in departments| filter:filterValue">\n\
                        <td>{{department.no}}</td>\n\
                        <td ng-show="checked">{{department.code}}</td>\n\
                        <td ng-show="checked">{{department.name}}</td>\n\
      <!--                  <td>{{department.Employees}}</td>-->\n\
                    </tr>\n\
                </table> \n\
  </div> \n\
</div>'
        
        
        
        
        /*'<button type="button" class="btn btn-default" ng-click="isCollapsedHorizontal = !isCollapsedHorizontal">Toggle collapse Horizontally</button> \n\
	<hr> \n\
	<div class="horizontal-collapse" uib-collapse="isCollapsedHorizontal" horizontal>   \n\
		<div class="well well-lg">Some content</div> \n\
	</div>' */
        
        
        
        
        
      
    };
});