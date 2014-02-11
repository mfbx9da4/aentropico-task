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

// AentropicoApp.directive('chart', function() {
//   return {
//     restrict: 'EA',
//     require: ['^ngModel'],
//     replace: true,
//     scope: {
//       ngModel: '=',
//       play: '&'
//     },
//     templateUrl: '/views/nprListItem.html',
//     link: function(scope, ele, attr) {
//       scope.duration = scope.ngModel.audio[0].duration.$text;
//     }
//   }
// });
