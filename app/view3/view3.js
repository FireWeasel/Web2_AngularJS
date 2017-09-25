'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$scope', 'myTasks', 'TaskDepartmentEmployees', function($scope, myTasks, TaskDepartmentEmployees) {

  $scope.IsVisible = false;
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

  $scope.ShowInfo = function(task) {
    var myEl = angular.element(document.querySelector('#divData'));
    $scope.IsVisible = true;
    myEl.html("Completed: " + task.completed);
  };

  $scope.EditTask = function(task) {
    var myEl = angular.element(document.querySelector('#UpdateTask'));
    $scope.UpdateTaskVisible = true;
    $scope.updatedInputNumber = task.number;
    $scope.updatedInputDescription = task.description;
    $scope.updatedInputCompleted = task.completed;
  }

}]);
