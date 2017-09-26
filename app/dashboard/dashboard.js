'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', [ '$scope', 'myTasks', 'myEmployees', 'myDepartments', function($scope, myTasks, myEmployees, myDepartments) {
	$scope.tasks = myTasks.data;
	$scope.employees = myEmployees.data;
	$scope.departments = myDepartments.data;

	$scope.TaskVisible = false;
	$scope.EmployeeVisible = false;
	$scope.DepartmentVisible = false;

	$scope.ShowTaskInfo = function(task) {
		var myEl = angular.element(document.querySelector('#showTask'));
		$scope.TaskVisible = true;
		myEl.html("Task info -> Number: " + task.number + " | Description: " + task.description + " | Completed: " + task.completed);
	};

	$scope.ShowEmployeeInfo = function(employee) {
		var myEl = angular.element(document.querySelector('#showEmployee'));
		$scope.EmployeeVisible = true;
		myEl.html("Employee info -> Name: " + employee.Name + " | Occupation: " + employee.Occupation + " | State: " + employee.State);
	};

	$scope.ShowDepartmentInfo = function(department) {
		var myEl = angular.element(document.querySelector('#showDepartment'));
		$scope.DepartmentVisible = true;
		myEl.html("Department info -> Id: " + department.id + " | Name: " + department.Name + " | Headquaters: " + department.Headquaters);
	};
}]);