exports.get_about = function(req, res) {
    res.sendfile('README.html');
};

exports.get_job = function(db) {
    response_body = {
        "id": "",
        "result": {
          "htmlreport":{url:"url to report"}
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

exports.post_algorithm = function(db) {
    return function(req, res) {
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
        this.insert_algorithm = function(count) {
            collection.insert({
                'title': title,
                'article': article,
                'dateCreated': dateCreated,
                'dateModified': dateModified
            }, complete_insert);
        };
        var complete_count = function(err, count) {
            insert_algorithm(count);
        };

        var url = req.body.url;
        

        if (!title || !article || !dateCreated || !dateModified) {
            res.send(404, 'hey, I am missing some info');
        }

        // Set our collection
        var collection = db.get('algorithmcollection');
        var promise = collection.count({});
        promise.on('complete', complete_count);
    };
};
