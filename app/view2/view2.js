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
                            'getAnEmployee',
                            'getDepartment',
                            'getTask',
                            'getTitles',
                            function($scope, myEmployees, getAnEmployee, getDepartment, getTask, getTitles) {
                                
        //employee list in app.js
        $scope.employees = myEmployees.data;//initializing factory
        $scope.quantity = 10;   //amount of displayed employees
        
        $scope.titles = [];
        getAllTitles();
   
$scope.anEmployeeData = "NOTHIIIIIING";
$scope.DepartmentOfEmp = "none";
$scope.TitlesOfEmp = [];
$scope.TaskOfEmp = "none";

$scope.giveEmp = function(empID){
    $scope.TitlesOfEmp = []; //resets variable if initialized by previous Employee
    var empNo = 10000 + empID;
  
    getAnEmployee.getEmp(empNo)
        .then(function(response){         
                $scope.anEmployeeData = response.data;
                $scope.anEmployeeData.Name = response.data.firstName + " " + response.data.lastName;
                
                if (!$scope.anEmployeeData.departments.length !== 0){   //if is empty
                    giveDep($scope.anEmployeeData.departments[0].no);
                }
                
                if ($scope.anEmployeeData.tasks.length !== 0){   //if is empty
                    giveTask($scope.anEmployeeData.tasks[0].no);
                }else{
                    delete $scope.TaskOfEmp;
                }
                
                if ($scope.anEmployeeData.titles.length !== 0){   //if is empty
                    for (var i = 0; i < $scope.anEmployeeData.titles.length; i++){
                        for (var j = 0; j < $scope.titles.length; j++){
                            if ($scope.anEmployeeData.titles[i].no === $scope.titles[j].no){
                                $scope.TitlesOfEmp.push($scope.titles[j].title);
                            }
                        }
                    }
                }else{
                    //delete $scope.TitlesOfEmp;
                    $scope.TitlesOfEmp.push("empty");
                }
        },function(error){
                        $scope.anEmployeeData = "Error happened in getAnEmployee service calling:<br/>" + error;
        });   
};

function giveDep(depID){
    
    getDepartment.getHisDep(depID)
        .then(function(response){         
                $scope.DepartmentOfEmp = response.data.name;
        },function(error){
                        alert("Error happened in getAnEmployee service calling:     " + error);
    });
};     

function giveTask(taskId){
    getTask.getHisTask(taskId)
        .then(function(response){         
                $scope.TaskOfEmp = response.data.title;
        },function(error){
                        alert("Error happened in getTask service calling:     " + error);
    });
};

function getAllTitles(){
   
    getTitles.getTheTitles()
        .then(function(response){
                $scope.titles = response.data;
        },function(error){
                        alert("Error happened in getTask service calling:     " + error);
    });
};
       
$scope.displayEndDate = function(date){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; 
    var yyyy = today.getFullYear();
    
    var todayString = yyyy + '-' + mm + '-' + dd;
    return date === "9999-01-01" ? "including today( " + todayString +" )": date;  
};

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
                                ,
                            "hireDate": todayString
                        });
                }

            };

            $scope.ComboBoxRemove = function() {
                var index = $scope.selectedEmployeeIndex1;

                if (index > -1) {
                    $scope.employees.splice(index, 1);
                }
            };

            $scope.UpdateEmployees = function() {

                var index = $scope.selectedEmployeeIndex2;

                $scope.employees[index].birthDate = $scope.updateBirthDate;
                $scope.employees[index].gender = $scope.updateGender;
            };
        
}])

.directive('employeeDataModule', function(){
    return{
        template: '\n\
            no: {{anEmployeeData.no}}<br/>    \n\
            Name: {{anEmployeeData.Name}}<br/>    \n\
            Birth date: {{anEmployeeData.birthDate}}<br/>    \n\
            Gender: {{anEmployeeData.gender}}<br/>    \n\
            Hire date: {{anEmployeeData.hireDate}}<br/><br/>    \n\
            Departments: \n\
                            <div>                                                                           \n\
                                <li><b>no: </b>        <u>{{anEmployeeData.departments[0].no}}                          </u></li>\n\
                                <li><b>Name:</b>       <u>{{DepartmentOfEmp}}                                           </u></li>\n\
                                <li><b>fromDate:</b>   <u>{{anEmployeeData.departments[0].fromDate}}                    </u></li>\n\
                                <li><b>toDate:</b>     <u>{{displayEndDate(anEmployeeData.departments[0].toDate)}}      </u></li>\n\
                            </div><br/>                                                                                  \n\
\n\
            Titles: <ul>    \n\
                       <li ng-repeat="title in TitlesOfEmp"><b>   {{title}}            </b></li>\n\
                    </ul>                               \n\
\n\
            Tasks: <b><li>{{TaskOfEmp ? TaskOfEmp : "NO TASKS"}}</li></b><br/>    '
                };
})
// : {{DepartmentOfEmp === "Development" ? "it\'s true" : "it\'s false"}}
.directive('detailModal', function() {
    return {
        template: '<!-- Modal -->\n\
                    <div class="modal fade" id="myModal" role="dialog">\n\
                      <div class="modal-dialog">\n\
\n\
                        <!-- Modal content-->\n\
                        <div class="modal-content">\n\
                          <div class="modal-header">\n\
                            <button type="button" class="close" data-dismiss="modal">&times;</button>\n\
                            <h4 class="modal-title">Employee Details:</h4>\n\
                          </div>\n\
\n\
                          <div class="modal-body">\n\
                            <p><employee-data-module></employee-data-module></p>\n\
                          </div>\n\
                          <div class="modal-footer">\n\
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\
                          </div>\n\
                        </div>\n\
\n\
                      </div>\n\
                    </div>'
    };
})

    //the Employee listing is a directive
.directive('myEmployeesList', function() {
        return {
            template: '<table class="table table-bordered table-hover" id="alexTable">\n\
                    <thead>\n\
                        <tr>\n\
                            <th ng-show="alexDetails">No</th>\n\
                            <th>Name</th>\n\
                            <th>Birth Date</th>\n\
                            <th>Gender</th>\n\
                            <th ng-show="alexDetails">Hire Date</th>\n\
                            <th>More details</th>\n\
                        </tr>\n\
                    </thead>\n\
                    <tbody>\n\
                        <tr ng-repeat="employee in employees | filter: filterValue | limitTo:quantity">\n\
                            <td ng-show="alexDetails">{{employee.no}}</td>\n\
                            <td>{{employee.Name}}</td>\n\
                            <td>{{employee.birthDate}}</td>\n\
                            <td>{{employee.gender}}</td>\n\
                            <td ng-show="alexDetails">{{employee.hireDate}}</td>\n\
                            <td><button class="btn btn-warning" ng-click="giveEmp($index + 1)" data-toggle="modal" data-target="#myModal">Click Me: {{employee.no}}</button></td>\n\
                        </tr>\n\
                    </tbody>\n\
                    </table>'
    };
});





        
