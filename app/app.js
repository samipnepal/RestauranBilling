var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'directives/login/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'directives/login/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'directives/signup/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'directives/login/login.html',
                controller: 'authCtrl',
                role: '0'
            })
			.when('/listuser', {
			title: 'User List',
			templateUrl: 'directives/listuser/listuser.html',
			controller: 'userCrtl'
		})
        .when('/userprofile', {
            title: 'User Profile',
            templateUrl:'directives/userprofile/userprofile.html',
            controller: 'profileCrtl'
        })
		.when('/additem', {
            title: 'Add Menu Item',
            templateUrl:'directives/addItem/additem.html',
            controller: 'itemCtrl'
        })
		.when('/itemslist', {
            title: 'Menu Item List',
            templateUrl:'directives/itemlist/itemlist.html',
            controller: 'itemCtrl'
        })
		.when('/orderbill', {
            title: 'Order Bill',
            templateUrl:'directives/orderbill/orderbill.html',
            controller: 'billCtrl'
        })
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.id) {
                    $rootScope.authenticated = true;
                    $rootScope.id = results.id;
                    $rootScope.fname = results.fname;
                    $rootScope.email = results.email;
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {
                        $location.path("/orderbill");
                    } else if(nextUrl == '/userprofile') {
                        $rootScope.$emit("getProfileMethod", $rootScope.email);
                    }
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });