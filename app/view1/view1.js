
'use strict';

var myApp1 = angular.module('myApp.view1', ['ui.bootstrap','ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
                                                    //, 'myEmployees'               , myEmployees
myApp1.controller('View1Ctrl', [ '$scope', 'RelationshipEmpDep', 'marinaService', function($scope, RelationshipEmpDep, marinaService) {
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
		marinaService.getDepartments()
		.then(function(response){
		$scope.departments = response.data;
		}, function(error){
		$scope.error = error;
		});
        
        
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
                    </tr>\n\
					<tr ng-repeat="department in departments| filter:filterValue">\n\
                        <td>{{department.no}}</td>\n\
                        <td ng-show="checked">{{department.code}}</td>\n\
                        <td ng-show="checked">{{department.name}}</td>\n\
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