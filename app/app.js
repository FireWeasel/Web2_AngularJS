'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])





//Alex
//assignment 4.3 factory holding all of the employees
.factory('myEmployees', ['myDepartments', function(myDepartments){        
        var obj = {};

        obj.data =
        [
            {"Name":"John Doe",
             "Occupation":"Developer",
             "State":"Ohio"
//             ,"Department":String(myDepartments.data[0].Name)
            },
            {"Name":"Catelyn Jones",
             "Occupation":"Secretary",
             "State":"Indiana"
//            ,"Department":String(myDepartments.data[0].Name)       
            },
            {"Name":"Tyler Lee",
             "Occupation":"Manager",
             "State":"Washington"  
//             ,"Department":String(myDepartments.data[2].Name)     
            },
            {"Name":"Peter Smith",
             "Occupation":"CEO",
             "State":"New York"    
//          ,"Department":String(myDepartments.data[2].Name)    
            },
            {"Name":"Jack Spiker",
             "Occupation":"Lawyer",
             "State":"California"  
 //            ,"Department":String(myDepartments.data[1].Name)      
            }
        ];
        
        //4.6 assignment              Made it so a Department is assigned RANDOMLY (on every F5 full website Refresg)
        for (var i = 0; i < obj.data.length; i++) {
            
            var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
            obj.data[i]['Department'] = myDepartments.data[randomNumber].Name;
        }
        
        return obj;
}])
//dummy classes 
/*.factory('empD', ['myEmployees' , function(myEmployees){
 		var obj = {};
 		
 		for (var i = 0; i < myEmployees.data.length; i++)
 		{
 		obj.data.push(myEmployees[i].Name);
 		}
 		return obj;

}])

.factory('deptE', ['myDepartments', function(myDepartments){
		var obj = {};
		for(var i = 0; i < myDepartments.data.length; i++)
		{
		obj.data.push(myDepartments[i].Name);
		}
		return obj;		
}])*/
//Marina
.factory('myDepartments', ['myEmployees', function(myEmployees) {
       	//var myEmployees = $injector.get('myEmployees');
        var obj = {};

        obj.data =
        [
            {   
            	"id" : "1",
                "Name":"Management",
                "Headquarters":"New York City"
                ,"Employee" : String(myEmployees.data[1].Name)
            },
            {
            	"id" : "2",
                "Name":"Sales",
                "Headquarters":"Chicago"
                ,"Employee" : String(myEmployees.data[1].Name)
            },
            {
            	"id" : "3",
                "Name":"Marketing",
                "Headquarters":"Boston"
                ,"Employee" : String(myEmployees.data[1].Name)
            },
            {
            	"id" : "4", 
                "Name":"IT",
                "Headquarters":"Seattle"
                ,"Employee" : String(myEmployees.data[1].Name)
            }
        ];

        return obj;
}]);


