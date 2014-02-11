AentropicoApp.controller('uploadController', ['$scope', '$http', '$upload', '$location', '$routeParams',
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