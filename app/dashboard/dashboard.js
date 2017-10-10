'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', [ '$scope', 'myTasks', 'myEmployees', 'myDepartments', 'uiCalendarConfig', function($scope, myTasks, myEmployees, myDepartments, uiCalendarConfig) {

  	//$scope.tasks = myTasks.data;
	//$scope.employees = myEmployees.data;
	//$scope.departments = myDepartments.data;
	
		/*taskService.getTasks()
		.then(function(response){
		$scope.tasks = response.data;
		},function(error){
		$scope.error = error;
		}); */
                $scope.tasks = myTasks.data;
                $scope.employees = myEmployees.data;
                $scope.departments = myDepartments.data;
                
              
  $scope.eventSources = [$scope.tasks];

	$scope.TaskVisible = false;
	$scope.EmployeeVisible = false;
	$scope.DepartmentVisible = false;

	$scope.ShowTaskInfo = function(task) {
		var myEl = angular.element(document.querySelector('#showTask'));
		$scope.TaskVisible = true;
		myEl.html("Task info -> Number: " + task.no + " | Description: " + task.title + " | Completed: " + task.description + " | Start date: " + task.creatioDate.toString());
	};

	$scope.ShowEmployeeInfo = function(employee) {
		var myEl = angular.element(document.querySelector('#showEmployee'));
		$scope.EmployeeVisible = true;
		myEl.html("Employee info -> Name: " + employee.Name + " | Birth Date: " + employee.birthDate + " | Gender: " + employee.gender);
	};

	$scope.ShowDepartmentInfo = function(department) {
		var myEl = angular.element(document.querySelector('#showDepartment'));
		$scope.DepartmentVisible = true;
		myEl.html("Department info -> Id: " + department.no + " | Name: " + department.name + " | Code: " + department.code);
	};
}]);
