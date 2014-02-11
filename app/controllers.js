AentropicoApp.controller('uploadController', ['$scope', '$http', '$upload', '$location', '$routeParams',
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