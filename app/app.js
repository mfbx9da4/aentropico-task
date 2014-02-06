var AentropicoApp = angular.module('AentropicoApp', ['angularFileUpload', 'ngRoute']);

AentropicoApp.config(function($routeProvider) {
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

AentropicoApp.controller('uploadController', ['$scope', '$http', '$upload', '$location', '$routeParams',
    function($scope, $http, $upload, $location, $routeParams) {
        $('input[type=file]').focus();
        window.sc = $scope;
        if ($routeParams.reportId) {
            buildGraphFromId($http, $routeParams.reportId);
        }

        $scope.onFileSelect = function($files) {
            var $percentComplete = $('#percent-complete');
            $percentComplete.width('0%').parent().show();
            var file = $files[0];
            $scope.upload = $upload.upload({
                url: '/csv',
                method: 'POST',
                file: file
            }).then(function(res) {
                if (!res.data.success) {
                    throw res.data.message;
                }
                // so user sees upload animation
                $location.path('reports/' + res.data.reportId);
            }, null, function(evt) {
                $percentComplete.width(parseInt(100.0 * evt.loaded / evt.total) + '%');
            });
        };
    }
]);

AentropicoApp.controller('aboutController', ['$scope',
    function($scope) {}
]);


AentropicoApp.controller('reportController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        buildGraphFromId($http, $routeParams.reportId);
    }
]);

function buildGraphFromId($http, reportId) {
    $http.get('/reports/' + reportId)
        .success(function(res) {
            var chart = lineChart()
                .width($('#graph').width())
                .height($('#graph').width() / 2)
                .x(function(d) {
                    return +d.x;
                })
                .y(function(d) {
                    return +d.y;
                });
            chart('#graph', res.data);
        });
}

function lineChart() {
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
            .domain(d3.extent(data, xValue));
        yScale
            .range([height - margin.top - margin.bottom, 0])
            .domain(d3.extent(data, yValue));

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