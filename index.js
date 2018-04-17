var pathUtil = require('path'),
    _        = require('underscore'),
    express  = require(pathUtil.join(__dirname,'./express.js')),
    log      = require(pathUtil.join(__dirname,'./logger.js')),
    Raspy    = require(pathUtil.join(__dirname,'./raspy.js')),
    conf     = require(pathUtil.join(__dirname,'./conf.json')),
    http     = require('http');

log.init();

try{
  if(!_.isEmpty(conf)){
    log.info("Using config file:\n"+JSON.stringify(conf));
  }
  else{
    log.warn("No config file defined. Bailing.");
    process.exit(1);
  }
}
catch(e){
  log.warn("Starting server resulted in the exception:"+e);
  process.exit(1);
}

process.title = conf.title;
var raspybot  = new Raspy();
var app       = express(raspybot);//start the server.

function shutdown(){
    httpServer.close();
    raspybot.shutdown();
    process.exit();
}

//define process handlers
process.on('SIGTERM', function() {
    log.info("Got kill signal. Exiting.");
    shutdown();
});

process.on('SIGINT', function() {
    log.warn("Caught interrupt signal(Ctrl-C)");
   shutdown();
});

process.on('exit', function(){
    log.info("server process exiting...");//bye bye bye
});

process.on('uncaughtException', function (err) {
    log.error(err);
});

//non secure site used to reroute to secure site.
var httpServer = http.createServer(app).listen(app.get('port'),
    function(){
    log.info(process.title+" server now listening on port:"+httpServer.address().port);
    raspybot.connect();
});

