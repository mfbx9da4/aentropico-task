exports.get_about = function(req, res) {
    res.sendfile('README.html');
};

exports.get_aws = function(req, res) {
    res.sendfile('misc/aws.html');
};

exports.get_report = function(db) {
    response_body = {
        "id": "",
        "result": {
            "htmlreport": {
                url: "url to report"
            }
        },
        "status": ""
    };
    return function(req, res) {

        var collection = db.get('csvcollection');
        collection.find({
            _id: req.params.id
        }, {}, function(e, docs) {
            if (docs) {
                var doc = docs[0];
                res.send(200, {
                    'id': doc._id,
                    'data': doc.data
                });
            } else {
                res.send(404);
            }
        });
    };
};

exports.post_csv = function(db, fs) {
    return function(req, res) {

        // get the temporary location of the file
        var tmp_path = req.files.file.path;
        var file_data;
        fs.readFile(tmp_path, {
            encoding: 'utf-8'
        }, function(err, data) {
            if (err) throw err;
            file_data = data.toString();
            delete_temporary(add_to_db, respond);
        });

        function delete_temporary(next, next2) {
            fs.unlink(tmp_path, function(err) {
                if (err) throw err;
                next(next2);
            });
        }

        function add_to_db(next) {
            var collection = db.get('csvcollection');
            collection.insert({
                data: file_data
            }, next);
        }

        function respond(err, doc) {
            if (err || !doc) {
                res.send(403, {
                    success: false,
                    message: 'There was a problem adding the information to the database.',
                    err: err,
                    doc: doc
                });
            } else {
                res.send(201, {
                    success: true,
                    message: 'ok',
                    reportId: doc._id
                });
            }
        }

    };
};