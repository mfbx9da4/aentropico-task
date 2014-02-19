d3.custom = {
    charts: {}
};


;d3.custom.charts.lineChart = function() {
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
    
    function exports(_selection) {
        _selection.each(function(data) {

            svg = d3.select(this).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Derive a linear regression
            var lin = ss.linear_regression().data(data.map(function(d) {
                return [+d.x, +d.y];
            })).line();

            var predictive_range = d3.extent(data, xValue);
            predictive_range[1] = predictive_range[1] * 1.4;
            var lindata = predictive_range.map(function(x) {
                    return {x: +x, 
                            y: lin(+x)};
            });

            xScale
                .range([0, width - margin.left - margin.right])
                .domain(d3.extent(predictive_range));
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

            svg.append("path")
                .datum(lindata)
                .attr("class", "reg")
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

;d3.custom.charts.barChart = function () {
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

    var xDomain = function (data) {
        return data.map(function(d, i) { return +i; });
    };

    function exports(_selection) {
        _selection.each(function(data) {
            var chartW = width ,
                chartH = height - margin.top - margin.bottom;


            var xScale = d3.scale.ordinal()
                    .domain(xDomain(data))
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
    exports.xDomain = function(_) {
        if (!arguments.length) return xDomain;
        xDomain = _;
        return exports;
    };
    exports.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return exports;
    };

    return exports;
};

;d3.custom.charts.worldChart = function() {
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

// var all = $('table.wikitable tr').map(function() {
//     return new Array($('td', this).map(function() {
//             var cell = $(this);
//             cell.find('span').empty();
//         return cell.text()
//     }).slice(0, 8).get())
// }).get()
// var hash = {};
// all.map(function (item) {hash[item[0]] = item[5];})

    function exports(_selection) {
        _selection.each(function(data) {
            var path = d3.geo.path()
                    .projection(cylindrical(width, height));

            svg = d3.select(this).append("svg")
                .attr("width", width)
                .attr("height", height);

            d3.json("/misc/world-50m.json", function(error, world) {
                d3.tsv("/misc/country-names.tsv", function (error, names) {
                    var countries = topojson.feature(world, world.objects.countries);
                    var land = topojson.feature(world, world.objects.land);
                    // var globe = {type: "Sphere"};
                    
                    var randColor = function() {
                        var rand255 = function () {return parseInt(Math.random()*255);};
                        var color = 'rgb(' + rand255() + ',' + rand255() + ',' + rand255() + ')'; 
                        return color;
                    };

                    svg.append("path")
                        .datum(land)
                        .attr("class", "land")
                        // .style("fill", randColor())
                        .attr("d", path);

                    svg.append("path")
                        .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
                            return a !== b;
                        }))
                        .attr("class", "country-border")
                        .attr("d", path);

                    min_wages = countries.features.filter(function(d) {
                        return names.some(function(n) {
                            if (d.id == n.id) {
                                d.name = n.name;
                                return true;
                            }
                        });
                    });

                    console.log('min_wages');
                    console.log(min_wages);

                    var returnId = function(d) {return min_wages[i].id; };
                    var returnName = function(d) {return min_wages[i].name; };
                    
                    for (i = 0; i < min_wages.length; i++) {

                        var bounds = path.bounds(min_wages[i]);
                        if (bounds[0][0] < 0) bounds[0][0] = 0;
                        if (bounds[1][0] > width) bounds[1][0] = width;
                        if (bounds[0][1] < 0) bounds[0][1] = 0;
                        if (bounds[1][1] < 0) bounds[1][1] = height;

                        svg.append("path")
                            .style("fill", randColor())  
                            .attr("x", bounds[0][0])
                            .attr("y", bounds[0][1])
                            .attr("width", bounds[1][0] - bounds[0][0])
                            .attr("height", bounds[1][1] - bounds[0][1])
                            .attr("d", path(min_wages[i]));
                    }

                });
            });

            function cylindrical(width, height) {
                return d3.geo.projection(function(λ, φ) {
                    return [λ, φ * 2 / width * height];
                })
                    .scale(width / 2 / Math.PI)
                    .translate([width / 2, height / 2]);
            }

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

;AentropicoApp.controller('uploadController', ['$scope', '$http', '$upload', '$location', '$routeParams',
    function($scope, $http, $upload, $location, $routeParams) {
        

        // (for fast file uploading)
        $('input[type=file]').focus();

        $scope.buildGraph = function (type, selector) {
            $(selector).empty();
            var chart_types ={
                'line': d3.custom.charts.lineChart,
                'bar': d3.custom.charts.barChart,
                'world': d3.custom.charts.worldChart
            };

            var chart = chart_types[type]()
                .width($(selector).width())
                .height($(selector).width() / 2)
                // .xDomain(function(data) {var extent = d3.extent(data, function(d, i) {return +i; }); var domain = []; var intervals = 10; for (var i = extent[0]; i < intervals; i ++) {var ratio = intervals /i; domain.push(extent[1] * ratio); } console.log(domain); return domain; })
                .x(function(d) {return +d.x; })
                .y(function(d) {return +d.y; });

            d3.select(selector)
                .datum($scope.data)
                .call(chart);
        };

        if ($routeParams.reportId) {
            $('#percent-complete').width('100%');
            getDataFromReportId($routeParams.reportId, {getDataFromAmazon: false}, function(data) {
                var type = 'world';
                var selector = '#graph';
                $scope.data = data;
                $scope.buildGraph(type, selector);
            });
        }

        $scope.onFileSelect = function($files) {
            // prepare animation
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


function getDataFromReportId(reportId, config, callback) {
    $.get('/reports/' + reportId)
        .success(function(res) {
            if (config.getDataFromAmazon) {
                $.get(res.url)
                    .success(function(data) {
                        data = d3.csv.parse(data);
                        callback(data);
                    });
            } else {
                var data = d3.csv.parse(res.data);
                callback(data);

            }
        });
}

function submitFileToS3(file, callback) {
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
                var file_key = xml.children[0].getElementsByTagName('Key')[0].innerHTML;
                callback(file_key);
            },
            error: function(res, status, error) {
                alert('Error uploading to amazon', error);
            }
        });
    };

    requestCredentials(file.name);

}