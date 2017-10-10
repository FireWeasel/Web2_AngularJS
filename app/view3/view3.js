'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$scope', 'myTasks', 'TaskDepartmentEmployees', function($scope, myTasks, TaskDepartmentEmployees) {

  $("#Start").datepicker();
  $("#End").datepicker();
  $("#updatedStart").datepicker();
  $("#updatedEnd").datepicker();
  $scope.UpdateTaskVisible = false;

  $scope.tasks = myTasks.data;

  $scope.AddTaskToList = function(){
    if ($scope.inputNumber && $scope.inputDescription && $scope.inputCompleted){
        $scope.tasks.push({
                "no": $scope.inputNumber,
                "title": $scope.inputDescription,
                "description": $scope.inputCompleted,
                "status": $scope.inputStatus,
                "start": $("#Start").datepicker('getDate'),
                "end": $("#End").datepicker('getDate')
        });
    }
    $scope.inputNumber = "";
    $scope.inputDescription = "";
    $scope.inputCompleted = "";
    $scope.inputStatus = "";
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

    $scope.tasks.find(checkNumber).title = $scope.updatedInputDescription;
    $scope.tasks.find(checkNumber).description = $scope.updatedInputCompleted;
    $scope.tasks.find(checkNumber).creatioDate = $("#updatedStart").datepicker('getDate');
    $scope.tasks.find(checkNumber).finishedDate = $("#updatedEnd").datepicker('getDate');
    $scope.UpdateTaskVisible = false;
  };

  $scope.EditTask = function(task) {
    $scope.updatedInputNumber = task.no;
    $scope.updatedInputDescription = task.title;
    $scope.updatedInputCompleted = task.description;
    $("#updatedStart").datepicker('setDate', task.creatioDate);
    $("#updatedEnd").datepicker('setDate', task.finishedDate);
  }

}]);
