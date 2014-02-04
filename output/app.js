var AentropicApp = angular.module('AentropicApp', ['angularFileUpload']);

var controllers = {};

controllers.uploadController = ['$scope', '$http', '$upload',
    function($scope, $http, $upload) {
        $scope.formData = {};

        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            $('#percent-complete').width('0%');
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
                $('#percent-complete').width(parseInt(100.0 * evt.loaded / evt.total) + '%');
            });
        };
    }
];



AentropicApp.controller(controllers);

// AentropicApp.config(function ($routeProvider) {
//  $routeProvider
//      .when('/', 
//          {
//              controller: 'uploadController',
//              templateUrl: 'html/upload.html'
//          })
//      .when('/about', 
//          {
//              controller: 'uploadController',
//              templateUrl: 'README.html'
//          })
//      .otherwise({redirectTo: '/'});
// });


// var MyCtrl = ['$scope', '$upload',
//     function($scope, $upload) {

//     }
// ];