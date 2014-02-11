var AentropicoApp = angular.module('AentropicoApp', ['angularFileUpload', 'ngRoute']);

AentropicoApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/about', {
            templateUrl: '../README.html',
            controller: 'aboutController'
        })
        .when('/reports/:reportId', {
            templateUrl: '../html/upload.html',
            controller: 'uploadController'
        })
        .when('/reports', {
            templateUrl: '../html/upload.html',
            controller: 'uploadController'
        })
        .otherwise({
            redirectTo: '/reports'
        });
});

