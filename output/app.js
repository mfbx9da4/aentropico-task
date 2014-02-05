var AentropicoApp = angular.module('AentropicoApp', ['angularFileUpload', 'ngRoute']);

AentropicoApp.config(function($routeProvider) {
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

AentropicoApp.controller('uploadController', ['$scope', '$http', '$upload', '$location',
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
                        var chart = lineChart()
                            .width($('#graph').width())
                            .height($('#graph').width() / 2);
                        chart('#graph', res.data);
                    });
            }, null, function(evt) {
                $percentComplete.width(parseInt(100.0 * evt.loaded / evt.total) + '%');
            });
        };
    }
]);

function lineChart() {
    // make line modifyable
    // make data loadable
    // redirect to permalink and create subview
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };
    var width = 760 - margin.left - margin.right;
    var height = 120 - margin.top - margin.bottom;

    var xValue = function(d) {
        return d[0];
    };
    var yValue = function(d) {
        return d[1];
    };

    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) {
            return xScale(d.x);
        })
        .y(function(d) {
            return yScale(d.y);
        });

    function chart(selector, dataset_text) {

        var svg = d3.select(selector).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.csv.parse(dataset_text);

        xScale
            .range([0, width - margin.left - margin.right])
            .domain(d3.extent(data, function(d) {
                return +d.x;
            }));
        yScale
            .range([height - margin.top - margin.bottom, 0])
            .domain(d3.extent(data, function(d) {
                return +d.y;
            }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
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

    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };
    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    chart.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
    };

    chart.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
    };

    return chart;
}


AentropicoApp.controller('aboutController', ['$scope',
    function($scope) {}
]);