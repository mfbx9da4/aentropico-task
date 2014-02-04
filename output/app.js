var AentropicApp = angular.module('AentropicApp', ['angularFileUpload']);

// AentropicApp.config(function($routeProvider) {
//     $routeProvider
//         .when('/upload', {
//             templateUrl: '../html/upload.html',
//             controller: 'uploadController'
//         })
//         .when('/about', {
//             templateUrl: '../html/about.html',
//             controller: 'aboutController'
//         })
//         .otherwise({
//             redirectTo: '/upload'
//         });
// });

AentropicApp.controller('uploadController', ['$scope', '$http', '$upload',
    function($scope, $http, $upload) {
        $scope.formData = {};

        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            var percentComplete = $('#percent-complete');
            $percentComplete.width('0%');
            var file = $files[0];
            $scope.upload = $upload.upload({
                url: '/algorithms',
                method: 'POST',
                data: {
                    myObj: $scope.formData.url
                },
                file: file
            }).then(function(response) {
                console.log(response.data);
            }, null, function(evt) {
                $percentComplete.width(parseInt(100.0 * evt.loaded / evt.total) + '%');
            });
        };
    }
]);

AentropicApp.controller('aboutController', ['$scope', '$http',
    function($scope) {
    }
]);


