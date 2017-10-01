'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$scope', 'myTasks', 'TaskDepartmentEmployees', function($scope, myTasks, TaskDepartmentEmployees) {

  $scope.UpdateTaskVisible = false;

  $scope.tasks = myTasks.data;

  $scope.AddTaskToList = function(){
    if ($scope.inputNumber && $scope.inputDescription && $scope.inputCompleted){
        $scope.tasks.push({
                "number": $scope.inputNumber,
                "description": $scope.inputDescription,
                "completed": $scope.inputCompleted
        });
    }
    $scope.inputNumber = "";
    $scope.inputDescription = "";
    $scope.inputCompleted = "";
  };

  $scope.DeleteTask = function(task) {
    var index = $scope.tasks.indexOf(task);
    $scope.tasks.splice(index, 1); 
  };

  $scope.UpdateTask = function(){

    var index = parseInt($scope.updatedInputNumber);

    function checkNumber(task) {
      return task.number == index;
    }

    $scope.tasks.find(checkNumber).description = $scope.updatedInputDescription;
    $scope.tasks.find(checkNumber).completed = $scope.updatedInputCompleted;
    $scope.UpdateTaskVisible = false;
  };

  $scope.EditTask = function(task) {
    $scope.updatedInputNumber = task.number;
    $scope.updatedInputDescription = task.description;
    $scope.updatedInputCompleted = task.completed;
  }

}]);
