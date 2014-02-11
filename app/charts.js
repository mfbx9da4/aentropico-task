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

