//This script defines the routes taken by the server.

var pathUtil           = require('path'),
    log                = require(pathUtil.join(__dirname,'./logger.js')),
    raspy              = require(pathUtil.join(__dirname,'./raspy.js'));

function auditRequest(req,res,next){
    log.info(req.method+" request to:"+req.originalUrl+" made by IP Address: "+req.ip);
    next();
}

function reRouteHttps(req,res,next){
    if('https' === req.protocol){
        next();
    }
    else{
        log.warn("Request not secure. Redirecting to secure site:"+req.hostname+req.url);
        res.redirect("https://"+req.hostname+req.url);
    }
}

module.exports = function(app,raspybot) {

  //EVERYTHING WILL BE AUDITED AND REROUTED TO SECURE SITE.
  app.use(auditRequest);//after logging, forward to https site.

  app.get('/center', function(req, res) {
      res.sendStatus(200);
  });

  app.post('/move', function(req, res) {
      req.setEncoding('utf8');
      console.info("POST:/move - "+JSON.stringify(req.body));
      let cmd = {
          "servo": req.body.servo,
          "pos" : req.body.pos
      };
      raspybot.sendCommand(cmd);
      res.sendStatus(200);
  });

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(function(err,req,res,next){
      log.error("Error middleware caught with error:"+err);
      res.sendStatus(err);
  });
};
