d3.custom = {
    charts: {}
};


d3.custom.charts.lineChart = function() {
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
    var svg;
    
    function exports(selector, dataset_text) {

        svg = d3.select(selector).append("svg")
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
    exports.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return exports;
    };
    exports.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return exports;
    };
    exports.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return exports;
    };
    exports.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return exports;
    };
    exports.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return exports;
    };

    return exports;
};

d3.custom.charts.barChart = function () {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500,
        height = 500,
        gap = 0;
    var svg;

    var xValue = function(d) {
        return d[0];
    };

    var yValue = function(d) {
        return d[1];
    };


    function exports(_selection) {
        _selection.each(function(_data) {
            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;


            console.log(_data);

            var xScale = d3.scale.ordinal()
                    .domain(_data.map(function(d, i) { return +i; }))
                    .rangeRoundBands([0, chartW], 0.1);

            var yScale = d3.scale.linear()
                    .domain([0, d3.max(_data, function(d, i) {return +yValue(d); })])
                    .range([chartH, 0]);

            var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");

            var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");

            var barW = chartW / _data.length;

            if (!svg) {
                svg = d3.select(this)
                    .append("svg")
                    .classed("chart", true);
                var container = svg.append("g").classed("container-group", true);
                container.append("g").classed("chart-group", true);
                container.append("g").classed("x-axis-group axis", true);
                container.append("g").classed("y-axis-group axis", true);
            }

            svg.select(".container-group")
                .attr({transform: "translate(" + margin.left + "," + margin.top + ")"});

            svg.select(".x-axis-group.axis")
                .attr({transform: "translate(0," + (chartH) + ")"})
                .call(xAxis);

            svg.select(".y-axis-group.axis")
                .call(yAxis);

            var gapSize = xScale.rangeBand() / 100 * gap;
            barW = xScale.rangeBand() - gapSize;
            var bars = svg.select(".chart-group")
                    .selectAll(".bar")
                    .data(_data);
            bars.enter().append("rect")
                .classed("bar", true)
                .attr({x: chartW,
                    width: barW,
                    y: function(d, i) { return yScale(yValue(d)); },
                    height: function(d, i) { return chartH - yScale(yValue(d)); }
                });
            bars.transition()
                .attr({
                    width: barW,
                    x: function(d, i) { return xScale(i) + gapSize / 2; },
                    y: function(d, i) { return yScale(yValue(d)); },
                    height: function(d, i) { return chartH - yScale(yValue(d)); }
                });
            bars.exit().transition().style({opacity: 0}).remove();
        });
    }
    exports.width = function(_) {
        if (!arguments.length) return width;
        width = parseInt(_);
        return this;
    };
    exports.height = function(_) {
        if (!arguments.length) return height;
        height = parseInt(_);
        return this;
    };
    exports.gap = function(_) {
        if (!arguments.length) return gap;
        gap = _;
        return this;
    };
    exports.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return exports;
    };
    exports.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return exports;
    };

    return exports;
};

;var AentropicoApp = angular.module('AentropicoApp', ['angularFileUpload', 'ngRoute']);

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
;AentropicoApp.controller('uploadController', ['$scope', '$http', '$upload', '$location', '$routeParams',
    function($scope, $http, $upload, $location, $routeParams) {
        
        buildBarChart($http, $routeParams.reportId);

        $('input[type=file]').focus();
        if ($routeParams.reportId) {
            $('#percent-complete').width('100%');
            buildChartFromReportId($http, $routeParams.reportId);
        }


        $scope.onFileSelect = function($files) {
            var $percentComplete = $('#percent-complete');
            $percentComplete.width('0%').parent().show();
            var file = $files[0];
            console.log(file);
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



function buildChartFromReportId($http, reportId) {
    $http.get('/reports/' + reportId)
        .success(function(res) {
            var chart = d3.custom.charts.lineChart()
                .width($('#graph').width())
                .height($('#graph').width() / 2)
                .x(function(d) {return +d.x; })
                .y(function(d) {return +d.y; });
            chart('#graph', res.data);
        });
}

function buildBarChart($http, reportId) {
    // var randomDataset = function () {
    //     return d3.range(~~(Math.random() * 50)).map(function(d, i) {
    //         return~~ (Math.random() * 1000);
    //     });
    // };

    $http.get('/reports/' + reportId)
        .success(function(res) {
            var chart = d3.custom.charts.barChart()
                .width($('#figure').width())
                .height($('#figure').width() / 2)
                .x(function(d) {return +d.x; })
                .y(function(d) {return +d.y; });

            var data = d3.csv.parse(res.data);

            d3.select("#figure")
                .datum(data)
                .call(chart);
            // chart('#figure', res.data);
        });

}

// direct uploading to s3
function AWS() {
    var processResponse = function (res) {
        console.log('res');
        console.log(res);
        $("#fld_redirect").val(res.S3Redirect);
        $("#fld_AWSAccessKeyId").val(res.s3Key);
        $("#fld_Policy").val(res.s3PolicyBase64);
        $("#fld_Signature").val(res.s3Signature);
        $("#myform").submit();
    };

    this.requestCredentials = function(filename) {
        var _file;

        _file = filename.replace(/.+[\\\/]/, "");

        $.ajax({
            url: "/gets3credentials/" + _file,
            dataType: "JSONP",
            success: processResponse,
            error: function(res, status, error) {
                console.log('here');
                console.log(res);
                console.log(status);
                console.log(error);
            }
        });
    };

}

window.aws = new AWS();