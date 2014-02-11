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
    
    // function exports(selector, dataset_text) {
    function exports(_selection) {
        _selection.each(function(data) {
            svg = d3.select(this).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


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
        });
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
        _selection.each(function(data) {
            var chartW = width ,
                chartH = height - margin.top - margin.bottom;


            var xScale = d3.scale.ordinal()
                    .domain(data.map(function(d, i) { return +i; }))
                    .rangeRoundBands([0, chartW], 0.1);

            var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d, i) {return +yValue(d); })])
                    .range([chartH, 0]);

            var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");

            var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");

            // var barW = chartW / data.length;

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
            var barW = xScale.rangeBand() - gapSize;
            var bars = svg.select(".chart-group")
                    .selectAll(".bar")
                    .data(data);
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
        

        // (for fast debugging)
        $('input[type=file]').focus();

        if ($routeParams.reportId) {
            $('#percent-complete').width('100%');
            buildLineChartFromReportId($http, $routeParams.reportId);
            buildBarChartFromReportId($http, $routeParams.reportId);
        }


        $scope.onFileSelect = function($files) {
            var $percentComplete = $('#percent-complete');
            $percentComplete.width('0%').parent().show();
            var file = $files[0];

            var file_key = submitFileToS3(file, function onUploadToAmazon (file_key){
                var file_url = 'https://s3.amazonaws.com/aedeveloper/' + file_key;
                $scope.upload = $upload.upload({
                        url: '/csv',
                        method: 'POST',
                        file: file,
                        data: {url: file_url},
                    }).then(function(res) {
                        if (!res.data.success) {throw res.data.message; }
                        $location.path('reports/' + res.data.reportId);
                    }, null, function(evt) {
                        $percentComplete.width(parseInt(100.0 * evt.loaded / evt.total) + '%');
                });
                
            });

        };
    }
]);

AentropicoApp.controller('aboutController', ['$scope',
    function($scope) {}
]);



function buildLineChartFromReportId($http, reportId) {
    $http.get('/reports/' + reportId)
        .success(function(res) {
            var chart = d3.custom.charts.lineChart()
                .width($('#graph').width())
                .height($('#graph').width() / 2)
                .x(function(d) {return +d.x; })
                .y(function(d) {return +d.y; });

            var data = d3.csv.parse(res.data);

            d3.select('#graph')
                .datum(data)
                .call(chart);
        });
}

function buildBarChartFromReportId($http, reportId) {
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
        });

}

function submitFileToS3(file, callback) {
    var file_key;
    var requestCredentials = function(filename) {
        filename = filename.replace(/.+[\\\/]/, "");
        $.ajax({
            url: "/signed",
            data: {title: filename },
            type: "GET",
            dataType: "json",
            success: processResponse,
            error: function(res, status, error) {
                throw error;
            }
        });
    };

    var processResponse = function (data) {
        var formData = new FormData();    
        formData.append('key', data.key);
        formData.append('AWSAccessKeyId', data.AWSAccessKeyId);
        formData.append('acl', 'public-read');
        formData.append('policy', data.policy);
        formData.append('signature', data.signature);
        formData.append('success_action_status', "201");
        formData.append('Content-Type', data.contentType);
        formData.append('file', file);

         $.ajax({
            url: "http://aedeveloper.s3.amazonaws.com/",
            type: "POST",
            processData: false,
            contentType: false,
            async:false,
            data: formData,
            dataType: 'text',
            success: function (res) {
                var xml = $.parseXML(res);
                file_key = xml.children[0].getElementsByTagName('Key')[0].innerHTML;
                console.log(file_key);
                callback(file_key);
            },
            error: function(res, status, error) {
                alert('Error', error);
            }
        });
    };

    requestCredentials(file.name);

}