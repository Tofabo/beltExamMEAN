var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'usersController',
    })
    .when('/dash', {
        templateUrl: 'partials/dash.html',
        controller: 'usersController', //probably gonig to change
    })
    .otherwise({
        redirectTo: '/login'
    })
})
