//This script defines the routes taken by the server.

var pathUtil  = require('path'),
    log       = require(pathUtil.join(__dirname,'./logger.js'));

function auditRequest(req,res,next){
    log.info(req.method+" request to:"+req.originalUrl+" made by IP Address: "+req.ip);
    next();
}
function cors(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = function(app,raspybot) {

  //EVERYTHING WILL BE AUDITED AND REROUTED TO SECURE SITE.
  app.use(auditRequest,cors);//after logging, forward to https site.

  //All this call does is tell the power LED to turn on.
  app.get('/connect', function(req, res){
     console.info("GET:/connect.");

     raspybot.remoteConnect();
     res.json({});
  });

  app.post('/move', function(req, res) {
      req.setEncoding('utf8');
      console.info("POST:/move - "+JSON.stringify(req.body));

      let cmd = {
          "servo": req.body.servo,
          "pos" : req.body.pos
      };
      raspybot.sendServoCommand(cmd);
      res.json({});
  });

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(function(err,req,res,next){
      log.error("Error middleware caught with error:"+err);
      res.sendStatus(err);
  });
};
