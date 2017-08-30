var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  //Creates a URL object
  var parsedUrl = url.parse(request.url);

  /*
  Request handler should send listingData in JSON format(application/json content type) 
  if GET request is sent to the '/listings' path
  */
  if (parsedUrl.pathname == '/listings'){
    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(listingData);
  }else{
    //Else it should send a 404 bad gateway error
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.end("Bad gateway error");
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  //Save the data in the listingData variable
  listingData = data;

  //Create the server
  server = http.createServer(requestHandler);
  server.listen(port, function() {
    //Once the server is listening, this callback function is executed
    console.log('Server listening');
  } );
  console.log('Server started');
} );
