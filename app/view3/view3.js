'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$scope', function($scope) {

  $scope.IsVisible = false;

  $scope.tasks = [
      {"number":"1",
       "description":"Clean the kitchen",
       "completed":"Yes"
      }, {"number":"2",
       "description":"Clean the living room",
       "completed":"No"
      }, {"number":"3",
       "description":"Clean the room",
       "completed":"No"
      }, {"number":"4",
       "description":"Do the WEB2 homework",
       "completed":"Yes"
      }
  ];

  $scope.AddTaskToList = function(){

    if ($scope.inputNumber && $scope.inputDescription && $scope.inputCompleted){
        $scope.tasks.push({
                "number": $scope.inputNumber,
                "description": $scope.inputDescription,
                "completed": $scope.inputCompleted
        });
    }

  };

  $scope.ComboBoxRemove = function() {
     var index = $scope.selectedTaskIndex;

     if (index > -1) {
       $scope.tasks.splice(index, 1);
     }
  };

  $scope.UpdateTask = function(){

    var index = parseInt($scope.selectedTaskIndexForUpdate) + 1;

    function checkNumber(task) {
      return task.number == index;
    }

    $scope.tasks.find(checkNumber).description = $scope.updatedInputDescription;
    $scope.tasks.find(checkNumber).completed = $scope.updatedInputCompleted;
  };

  $scope.ShowInfo = function(task) {
    var myEl = angular.element(document.querySelector('#divData'));
    $scope.IsVisible = true;
    myEl.html("Completed: " + task.completed);
  };

}]);
