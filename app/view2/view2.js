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
                            'employeesService',
                            function($scope, myEmployees, getAnEmployee, getDepartment, getTask, getTitles, employeesService) {

        //employee list in app.js
        $scope.employees = myEmployees.data;//initializing factory
        $scope.quantity = 10;   //amount of displayed employees
        
        $scope.theDepartments;  //this is used to list the names in the Update Form, and to get the names of each dep
        employeesService.getDepartments()
                .then(function(response){
                    $scope.theDepartments = response.data;
                }, function(error){
                    console.log(error);
        });

        $scope.titles = [];
        getAllTitles();

$scope.anEmployeeData = "NOTHIIIIIING";
$scope.DepartmentOfEmp = "none";
$scope.TitlesOfEmp = [];
$scope.TaskOfEmp = "none";
                            //empName
$scope.giveEmp = function(empNo){
//    var empNo;
//    for (var i = 0; i < $scope.employees.length; i++){
//        if (empName === $scope.employees[i].Name){
//            empNo = $scope.employees[i].no;
//        }
//    }
  if (empNo <= 11000 && empNo >= 10001){
     var indexOfEmp = getIndexOfEmpByNumber(empNo); //will equal NULL if Employee is REMOVED from LOCAL employees
                
                
      getAnEmployee.getEmp(empNo)
        .then(function(response){
            
                $scope.anEmployeeData = response.data;
                $scope.anEmployeeData.Name = response.data.firstName + " " + response.data.lastName;
                
                
                
                //Update this object with the potential new data from the one in local employees

                    if (indexOfEmp !== null){                    
                        $scope.anEmployeeData.hireDate = $scope.employees[indexOfEmp].hireDate;
                        $scope.anEmployeeData.birthDate = $scope.employees[indexOfEmp].birthDate;
                        $scope.anEmployeeData.gender = $scope.employees[indexOfEmp].gender;
                        
                        
                        if ($scope.employees[indexOfEmp].newDepartment.length > 0){
                            for (var i = 0; i < $scope.employees[indexOfEmp].newDepartment.length; i++){
                                $scope.anEmployeeData.departments.push($scope.employees[indexOfEmp].newDepartment[i]);
                            }                            
                        }
                        
                        //Now a loop that will make displaying the Department Name in the MODAL easier
                        for (var i = 0; i < $scope.anEmployeeData.departments.length; i++){
                            for (var j = 0; j < $scope.theDepartments.length; j++){
                                if ($scope.anEmployeeData.departments[i].no === $scope.theDepartments[j].no){
                                    $scope.anEmployeeData.departments[i].name = $scope.theDepartments[j].name;
                                }
                            }
                        }
                        
                      
                    }else{
                        console.log("No employee with number:   " + indexOfEmp);
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
  }else{
      alert("No detailed data for recently hired employees!");
  }

};

function giveDep(depID){

    getDepartment.getHisDep(depID)
        .then(function(response){
                $scope.DepartmentOfEmp = response.data.name;
                // $scope.DepartmentOfEmp.push(response.data.name);
        },function(error){
                        alert("Error happened in getAnEmployee service calling:     " + error);
    });
};

function giveTask(taskId){
    getTask.getHisTask(taskId)
        .then(function(response){
                $scope.TaskOfEmp = response.data.title;
                //$scope.TaskOfEmp.push(response.data.title);
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

function getIndexOfEmpByNumber(no){
    for (var i = 0; i < $scope.employees.length; i++){
        if (no === $scope.employees[i].no){
            return i;
        }
    }
    
    return null;
}

$scope.displayEndDate = function(date){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var todayString = yyyy + '-' + mm + '-' + dd;
    return date === "9999-01-01" ? "including today( " + todayString +" )": date;
};

function getTodayDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    
    var todayString = yyyy + '-' + mm + '-' + dd;
    return todayString;
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
                            "gender": $scope.inpGender,
                            "hireDate": todayString,
                            "newDepartment" : 
                                    {
                                        "no"  : 1 + parseInt($scope.selectedAddDepartmentIndex),
                                        "fromDate" : getTodayDate(),
                                        "toDate" : getTodayDate()
                                    }
                        });
                }

            };

            $scope.ComboBoxRemove = function(param1) {
                var index;
                
                if(typeof param1 !== "undefined"){
                    index = $scope.employees.indexOf(param1);
                    
                    if (index > -1) {
                        $scope.employees.splice(index, 1);
                    }
                }else{
                    index = $scope.selectedEmployeeIndex1;

                    if (index > -1) {
                        $scope.employees.splice(index, 1);
                    }
                }
            };

            $scope.UpdateEmployees = function() {

                var index = $scope.selectedEmployeeIndex2;

                $scope.employees[index].birthDate = $scope.updateBirthDate;
                $scope.employees[index].gender = $scope.updateGender;
                
                              
                if ($scope.selectedUpdateDepartmentIndex >= 0 && $scope.selectedUpdateDepartmentIndex <= 8){     
                    
                    var tempProceed = 1;
                    
                    for (var i = 0; i < $scope.employees[index].newDepartment.length; i++){
                        if (1 + parseInt($scope.selectedUpdateDepartmentIndex) === $scope.employees[index].newDepartment[i].no){
                            console.log("An Employee cannot be reinlisted in a previous department(exclding initial department - FEATURE!!1!!)");
                            tempProceed = null;
                            alert("An Employee cannot be reinlisted in a previous department(exclding initial department - FEATURE(bug)!!!)");
                        }
                    }
                    if (tempProceed !== null){
                        $scope.employees[index].newDepartment.push(
                            {
                                "no"  : 1 + parseInt($scope.selectedUpdateDepartmentIndex),
                                "fromDate" : getTodayDate(),
                                "toDate" : getTodayDate()
                            }
                        );
                
                        var indexLastNewDep = parseInt($scope.employees[index].newDepartment.length) - 1;
                        if (typeof $scope.anEmployeeData.departments !== "undefined"){
                            var indexLastDep = parseInt($scope.anEmployeeData.departments.length) - 1;
                            $scope.anEmployeeData.departments[indexLastDep].toDate = $scope.employees[index].newDepartment[indexLastNewDep].fromDate;
                        }
                    }
                    
                }
                
                
            };

            $scope.resetVariables = function(){
                $scope.DepartmentOfEmp = "none";//resets variable if initialized by previous Employee
                $scope.TitlesOfEmp = []; //resets variable if initialized by previous Employee
                $scope.TaskOfEmp = "none";
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
                            <div ng-repeat="dep in anEmployeeData.departments">                                                                           \n\
                                <li><b>no: </b>        <u>{{dep.no}}                          </u></li>\n\
                                <li><b>Name:</b>       <u>{{dep.name}}                                           </u></li>\n\
                                <li><b>fromDate:</b>   <u>{{displayEndDate(dep.fromDate)}}                    </u></li>\n\
                                <li><b>toDate:</b>     <u>{{displayEndDate(dep.toDate)}}      </u></li><br/>\n\
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
                            <button ng-click="resetVariables()" type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\
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
                            <th>Remove</th>\n\
                        </tr>\n\
                    </thead>\n\
                    <tbody>\n\
                        <tr ng-repeat="employee in employees | filter: filterValue | limitTo:quantity">\n\
                            <td ng-show="alexDetails">{{employee.no}}</td>\n\
                            <td>{{employee.Name}}</td>\n\
                            <td>{{employee.birthDate}}</td>\n\
                            <td>{{employee.gender}}</td>\n\
                            <td ng-show="alexDetails">{{employee.hireDate}}</td>\n\
                            <td><button class="btn btn-info" ng-click="giveEmp(employee.no)" data-toggle="modal" data-target="#myModal">Click Me: {{employee.no}}</button></td>\n\
                            <td><button class="btn btn-danger" ng-click="ComboBoxRemove(employee)"><span class="glyphicon glyphicon-trash"></span></button></td>                     \n\
                        </tr>\n\
                    </tbody>\n\
                    </table>'
    };
});
