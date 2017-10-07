'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [  '$scope',
                            'myEmployees',
                            function($scope, myEmployees) {
                                
        //employee list in app.js
        $scope.employees = myEmployees.data;//initializing factory


        
//        
//        $scope.departments = [];
//        for (var i = 0; i < RelationshipEmpDep.data.length; i++){
//            $scope.departments.push(RelationshipEmpDep.data[i].Name);    //Adding only the name of each department
//        }

                                
                                
        //4.6 LOOK in app.js
                //Made it so a Department is assigned RANDOMLY (on every view2 refresh)
//                for (var i = 0; i < $scope.employees.length; i++) {
//                    var randomNumber = Math.floor(Math.random()*$scope.departments.length);
//                    $scope.employees[i]['Department'] = $scope.departments[randomNumber];
//                }
        
        
        
        $scope.AddToList = function(){
            
            if ($scope.inpName && $scope.inpBirthDate && $scope.inpGender){
                var today = new Date();
                var dd = today.getDay() + 1;

                var mm = today.getMonth() + 1; 
                var yyyy = today.getFullYear();
                
                if(dd<10)
                {
                    dd='0'+dd;
                } 

                if(mm<10) 
                {
                    mm='0'+mm;
                } 
                
                var todayString = yyyy + '-' + mm + '-' + dd;
                
                $scope.employees.push({
                        "no": $scope.employees[$scope.employees.length - 1].no + 1,
                        "Name": $scope.inpName,
                        "birthDate": $scope.inpBirthDate,
                        "gender": $scope.inpGender
                        //,                        "Department": $scope.departments[$scope.selectedDepartment]
                        ,"hireDate": todayString
                });
            }
            
        };
        
        $scope.ComboBoxRemove = function() {
           var index = $scope.selectedEmployeeIndex1;
           
            if (index > -1) {
               $scope.employees.splice(index, 1);
            }
        };

        $scope.UpdateEmployees = function(){

           var index = $scope.selectedEmployeeIndex2;

          $scope.employees[index].birthDate = $scope.updateBirthDate;
          $scope.employees[index].gender = $scope.updateGender;
//          $scope.employees[index].Department = $scope.departments[$scope.updatedDepartment];
        };
        
//        for (var i = 0; i <= $scope.employees.length; i++){
//            if ($scope.employees[i].Occupation === "CEO"){
//                
//            }
//        }
        
}])



//the Employee listing is a directive
.directive('myEmployeesList', function(){
    return{
        template: '<table class="table table-bordered" id="alexTable">\n\
                    <thead>\n\
                        <tr>\n\
                            <th ng-show="alexDetails">No</th>\n\
                            <th>Name</th>\n\
                            <th>Birth Date</th>\n\
                            <th>Gender</th>\n\
                            <th ng-show="alexDetails">Hire Date</th>\n\
                            <th ng-show="alexDetails">Department</th>\n\
                        </tr>\n\
                    </thead>\n\
                    <tbody>\n\
                        <tr ng-repeat="employee in employees | filter: filterValue">\n\
                            <td ng-show="alexDetails">{{employee.no}}</td>\n\
                            <td>{{employee.Name}}</td>\n\
                            <td>{{employee.birthDate}}</td>\n\
                            <td>{{employee.gender}}</td>\n\
                            <td ng-show="alexDetails">{{employee.hireDate}}</td>\n\
                            <td ng-show="alexDetails">{{employee.Department}}</td>\n\
                        </tr>\n\
                    </tbody>\n\
                    </table>'
    };
});


        