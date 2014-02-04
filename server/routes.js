exports.get_about = function(req, res) {
    res.sendfile('README.html');
};

exports.get_job = function(db) {
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
        var collection = db.get('algorithmcollection');
        collection.find({
            _id: Number(req.params.id)
        }, {}, function(e, docs) {
            res.send(200, {
                'id': docs._id
            });
        });
    };
};

exports.post_algorithm = function(db, fs) {
    return function(req, res) {
        console.log(req.files);
        var data = {}; // for the response

        // get the temporary location of the file
        var tmp_path = req.files.file.path;

        fs.readFile(tmp_path, {encoding: 'utf-8'}, function (err, data) {
          if (err) throw err;
          delete_temporary(add_to_db, respond);
        });
        
        function delete_temporary (next, next2) {
            console.log('now delete temporary, add to db and return id');
            console.log(tmp_path);
            fs.unlink(tmp_path, function(err) {
                if (err) throw err;
                next(next2);
            });
        }

        function add_to_db (next) {
            console.log('add to db');
            next();
        }

        function respond() {
            res.send(201);
        }

        // var errors = {};
        // if (!url && !file) {
        //     errors.url = 'Must include url or file';
        // } 

        // if (errors) {
        //     data.success = false;
        //     data.message = errors;
        //     res.send(404, data);
        // } else {
        //     data.success = true;
        //     data.message = 'Success!';
        //     res.send(404, data);
        // }

        // // Set our collection
        // var collection = db.get('algorithmcollection');

    };
};

var complete_insert = function(err, doc) {
    if (err) {
        // If it failed, return error
        res.send(403, 'There was a problem adding the information to the database.');
    } else {
        // If it worked, set the header so the address bar doesn't still say /adduser
        res.send(201, {
            'algorithm': doc._id
        });
    }
};
var insert_algorithm = function(collection) {
    collection.insert({
        'url': url
    }, complete_insert);
};