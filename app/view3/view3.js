'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$scope', function($scope) {

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

}]);