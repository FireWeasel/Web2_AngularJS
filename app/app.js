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
                        //'myDepartments',          myDepartments
.factory('myEmployees', [function(){        
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
//        for (var i = 0; i < obj.data.length; i++) {
//            
//            var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
//            obj.data[i]['Department'] = myDepartments.data[randomNumber].Name;
//        }
        
        return obj;
}])

.factory('RelationshipEmpDep', ['myEmployees', 'myDepartments', function(myEmployees, myDepartments) {
        
        var obj = {};
        obj.data = myDepartments.data;
        //Assigning a RANDOM department to EACH Employee
        for (var i = 0; i < myEmployees.data.length; i++) {
            
            var randomNumber = Math.floor(Math.random()*myDepartments.data.length);
            myEmployees.data[i]['Department'] = myDepartments.data[randomNumber].Name;
            if(!myDepartments.data[randomNumber]['Employee']) 
            {
 				 myDepartments.data[randomNumber]['Employee'] = '';
 			}
            myDepartments.data[randomNumber]['Employee'] += myEmployees.data[i].Name + " " ;
        }
        
        return obj;
}])


//Marina                'myEmployees',      myEmployees
.factory('myDepartments', [function() {
        var obj = {};

        obj.data =
        [
            {   
            	"id" : "1",
                "Name":"Management",
                "Headquarters":"New York City"
            },
            {
            	"id" : "2",
                "Name":"Sales",
                "Headquarters":"Chicago"
            },
            {
            	"id" : "3",
                "Name":"Marketing",
                "Headquarters":"Boston"
            },
            {
            	"id" : "4", 
                "Name":"IT",
                "Headquarters":"Seattle"
            }
        ];

        return obj;
}]);


