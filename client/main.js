var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'usersController',
    })
    .when('/dash', {
        templateUrl: 'partials/dash.html',
        controller: 'itemsController', 
    })
    .when('/user/:userid', {
        templateUrl: 'partials/user.html',
        controller: 'itemsController', 
    })
    .otherwise({
        redirectTo: '/login'
    })
})
