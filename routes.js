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

module.exports = function(app) {

  //EVERYTHING WILL BE AUDITED AND REROUTED TO SECURE SITE.
  app.use(auditRequest,//if not mobile site, then log it.
      // reRouteHttps
  );//after logging, forward to https site.

  app.get('/',function(req,res,next){
    res.sendStatus(404);
  });

  app.get('/center', function(req, res) {
      raspy.processCommand("0,600");
      res.sendStatus(200);
  });

  app.get('/left', function(req, res) {
      raspy.processCommand("0,1200");
      res.sendStatus(200);
  });

  app.get('/right',function(req,res,next){
      res.sendStatus(200);
  });

  app.get('/up',function(req,res,next){
      res.sendStatus(200);
  });

  app.get('/down',function(req,res,next){
      res.sendStatus(200);
  });

  //everything else is a 404, not found.
  app.get('*',function(req,res,next){
      res.sendStatus(404);
  });

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(function(err,req,res,next){
      log.error("Error middleware caught with error:"+err);
      res.sendStatus(err);
  });
};
