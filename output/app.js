var AentropicApp = angular.module('AentropicApp', ['angularFileUpload', 'ngRoute']);

AentropicApp.config(function($routeProvider) {
    $routeProvider
        .when('/upload', {
            templateUrl: '../html/upload.html',
            controller: 'uploadController'
        })
        .when('/about', {
            templateUrl: '../README.html',
            controller: 'aboutController'
        })
        .otherwise({
            redirectTo: '/upload'
        });
});

AentropicApp.controller('uploadController', ['$scope', '$http', '$upload', '$location',
    function($scope, $http, $upload, $location) {
        $scope.formData = {};
        $('input[type=file]').focus();

        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            var $percentComplete = $('#percent-complete');
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
                if (!response.data.success) {
                    throw response.data.message;
                }
                // $location.path('/jobs/' + response.data.job_id);
                $http.get('/jobs/' + response.data.jobId)
                    .success(function(res) {
                        graph(res.data);
                    });
            }, null, function(evt) {
                $percentComplete.width(parseInt(100.0 * evt.loaded / evt.total) + '%');
            });
        };
    }
]);

function graph(dataset_text) {
        var $parentGrid = $('#graph');


        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = $parentGrid.width() - margin.left - margin.right,
        height = ($parentGrid.width()/2) - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse;

        var x = d3.scale.linear()
        .range([0, width]);

        var y = d3.scale.linear()
        .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

        var svg = d3.select("#graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.csv.parse(dataset_text);
            x.domain(d3.extent(data, function(d) { return parseInt(d.x); }));
            y.domain(d3.extent(data, function(d) { return parseInt(d.y); }));

            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

            svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)");

            svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
}

AentropicApp.controller('aboutController', ['$scope',
    function($scope) {}
]);

