var restify     =   require('restify'); // includes restify in the application
var imdb        =   require('imdb-api'); // includes the imdb api in the application
var server      =   restify.createServer(); // starts a restify server

// this basically sets the properties of the server - where it can accept requests from, etc. this is saying to accept all requests from anywhere.
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// sets the server to start listening to requests on port 9804.
server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ",process.env.PORT || 9804);
});

// The Godfather
// This opens a slot for requests to come in, and allows you to process them.
server.get('/api/v1/getFavouriteMovie', function (req, res, next) {
    movieName = req.params.title;
    // Sets parameters for the response

    if(movieName) {
        imdb.getReq({ name: movieName }, (err, things) => {
            res.writeHead(400, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            // Sends the response with this message
            res.end(JSON.stringify(things));
            
        });
    } else {
        res.writeHead(400, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        // Sends the response with this message
        res.end(JSON.stringify({
            message: "aww."
        }));
    }
    return next;
});