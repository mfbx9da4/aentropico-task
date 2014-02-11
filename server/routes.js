exports.get_about = function(req, res) {
    res.sendfile('README.html');
};

exports.get_report = function(db) {
    return function(req, res) {
        var collection = db.get('csvcollection');
        if (req.params.id) {
            collection.find({
                _id: req.params.id
            }, {}, function(e, docs) {
                if (docs) {
                    var doc = docs[0];
                    res.send(200, {
                        'id': doc._id,
                        'data': doc.data,
                        'url': doc.url
                    });
                } else {
                    res.send(404, 'No docs found!');
                }
            });
        } else {
            res.send(404, 'No id given!');
        }
    };
};

exports.post_csv = function(db, fs) {
    return function(req, res) {

        var file_url = req.body.url;
        var file_data;
        
        // get the temporary location of the file
        var tmp_path = req.files.file.path;
        fs.readFile(tmp_path, {
                encoding: 'utf-8'
            }, function(err, data) {
                if (err) throw err;
                file_data = data.toString();
                // sequentially delete temp, add it to db and then respond
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
                data: file_data,
                url: file_url
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