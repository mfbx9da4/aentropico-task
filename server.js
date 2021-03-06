var setup_monk = function(fn) {
    // checks if connected to the internet,
    // if connected uses mongohq db else uses local db
    // NB: must export mongohq url as env var.
    // require('monk')(process.env.MONGOHQ_URL).get('csvcollection').find({}, function(e,d){console.log(e || d)})
    // require('monk')(LOCAL_DB_URL).get('csvcollection').find({}, function(e,d){console.log(e || d)})
    var db;
    if (process.argv[2] == "local") {
        console.log('Override: using local db'.yellow);
        db = monk(LOCAL_DB_URL);
        fn(db);   
    } else if (process.argv[2] == "remote") {
        console.log('Override: using remote db'.yellow);
        db = monk(process.env.MONGOHQ_URL);
        fn(db);
    } else {
        var db_url, connected_to_internet;
        http.get("http://example.com", function(res) {
                if (process.env.MONGOHQ_URL) {
                    db_url = process.env.MONGOHQ_URL;
                } else {
                    db_url = LOCAL_DB_URL;
                    console.log('MONGOHQ_URL env var not set, using local db'.red);
                }
                db = monk(db_url, {}, function () {
                        console.log('Todo bom, remote MONGOHQ_URL for db'.green);                
                        fn(db);
                    })
                    .on('error', function (e){
                        db = monk(LOCAL_DB_URL);
                        console.log('Error connecting to mongohq, using local db'.red);
                        fn(db);
                    });
            }).on('error', function(e) {
                console.log('You are not connected to the internet, using local db'.red);
                db = monk(LOCAL_DB_URL);
                fn(db);
            });
    }
};

var express = require('express');
var app = express();
var colors = require('colors');
var debug = require('debug');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongo = require('mongodb');
var monk = require('monk');
var routes = require('./server/routes');
var aws = require('./server/aws');
var LOCAL_DB_URL = 'localhost:27017/aentropic-task';

setup_monk(function (db) {

    app.configure(function() {
        app.use(express.urlencoded());
        app.use(express.json());
        // allow file uploads of up to 5 gb
        app.use(express.multipart({limit:'5000mb'}));
    });

    // all environments
    console.log();
    app.set('port', process.argv[3] || 8000);
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname));

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    } else {
        config.redirect_host = 'http://still-citadel-3009.herokuapp.com/';
    }

    // CORS
    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get('/about', routes.get_about);
    app.get('/signed', aws.signed);
    app.get('/reports/:id', routes.get_report(db));
    app.post('/csv', routes.post_csv(db, fs));


    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port '.yellow + app.get('port'));
        debug('listening');
    });
});

