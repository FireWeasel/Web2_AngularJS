'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$scope', 'myTasks', 'getTask','myEmployees','myDepartments', function($scope, myTasks, getTask,myEmployees,myDepartments) {

  $("#Start").datepicker();
  $("#End").datepicker();
  $("#updatedStart").datepicker();
  $("#updatedEnd").datepicker();
  $scope.UpdateTaskVisible = false;
  $scope.employees = myEmployees.data;
  $scope.tasks = myTasks.data;
  $scope.departments = myDepartments.data;
  $scope.taskEmp = "none";
  $scope.taskEmpName = [];
  $scope.taskDep = "none";
  $scope.taskDepName = [];

  $scope.getEmployeeNames = function(taskNo){
    $scope.taskEmpName = [];
    $scope.taskDepName = [];

    getTask.getHisTask(taskNo)
    .then(function(response){

            $scope.taskEmp = response.data.employees;
            $scope.taskDep = response.data.deptNo;

            for(var i = 0; i < $scope.taskEmp.length; i++)
            {
              for(var j = 0; j < $scope.employees.length; j++)
              {
                if($scope.taskEmp[i].no == $scope.employees[j].no)
                {
                  $scope.taskEmpName.push($scope.employees[j].Name);
                }
              }
            }
            /*  for(var k = 0; k < $scope.taskDep.length; k++)
              {
                for(var j = 0; j < $scope.departments.length; j++)
                {
                  if($scope.taskDep[k] == $scope.departments[j].no)
                  {
                    $scope.taskDepName.push($scope.departments[j].name);
                  }
                }
              }*/
    },function(error){
                    alert("Error happened in getAnEmployee service calling:     " + error);
});

  }

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
