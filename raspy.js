var pathUtil = require('path'),
    log      = require(pathUtil.join(__dirname,'./logger.js')),
    cp       = require('child_process'),
    _        = require('underscore');

ELBOW = 0;
HEAD_PAN = 1;
HEAD_TILT = 3;
SHOULDER = 4;
BASE = 5;
HAND = 6;
WRIST = 7;

function Raspy(){
    var self      = this;
    this._cmd     = pathUtil.join(__dirname,"raspibot.py");
    this._maestro = null;

    Raspy.prototype.shutdown = function(){
        var self = this;
        if(!_.isEmpty(self._maestro)){
            process.kill(self._maestro.pid);//clean-up python serial connection
        }
    };

    Raspy.prototype.connect = function() {
        var self = this;
        self._maestro = cp.spawn('python', [self._cmd]);
        self._maestro.stdin.setEncoding('utf-8');

        self._maestro.stdout.on('data', (data) => {
            log.info('raspy received stdout from maestro:'+data.toString());
            if(_.isEqual(data.toString(),'CONNECTED')){
                log.info("Successfully started raspibot.py script.");
                //self.wakeUp();
            }
        });

        self._maestro.stderr.on('data', (err) => {
            log.error('raspy received stderr from maestro:'+err);
        });

        self._maestro.on('close', (code) => {
            log.info('raspy python process closed with code:'+code);
        });

        self._maestro.on('exit', (code) => {
            log.info('raspy python process exited with code:'+code);
        });
    };

    /*
    Raspy.prototype.wakeUp = function(){
        var self = this;
        self.sendServoCommand(HEAD_TILT+","+9000);//get head out of arm's way
        self.sendServoCommand({"servo":HEAD_TILT,"pos":9000});//get head out of arm's way
        self.sendServoCommand({"servo":BASE,"pos":5833});
        self.sendServoCommand({"servo":SHOULDER,"pos":3000});
        self.sendServoCommand({"servo":ELBOW,"pos":9000});
        self.sendServoCommand({"servo":WRIST,"pos":9000});
        self.sendServoCommand({"servo":HAND,"pos":9000});//hand open
        self.sendServoCommand({"servo":HEAD_PAN,"pos":5500});//center head
        self.sendServoCommand({"servo":HEAD_TILT,"pos":6000});//put head up
    };
    */

    Raspy.prototype.remoteDisconnect = function(){
        var self = this;
        log.info("Raspy got disconnect command.");
        if (!_.isEmpty(self._maestro)) {
            log.warn('Sending remote disconnect command down to stdin of maestro.');
            self._maestro.stdin.write('REMOTE_DISCONNECT'+'\r\n');//just send down raw
        }
        else {
            log.error("Raspy error. Maestro object null.");
        }
    };

    Raspy.prototype.remoteConnect = function(){
      var self = this;
      log.info("Raspy got connect command.");
      if (!_.isEmpty(self._maestro)) {
        log.warn('Sending remote connect command down to stdin of maestro.');
        self._maestro.stdin.write('REMOTE_CONNECT'+'\r\n');//just send down raw
      }
      else {
        log.error("Raspy error. Maestro object null.");
      }
    };

    Raspy.prototype.sendServoCommand = function(cmd){
        var self = this;
        log.info("Raspy got servo command:" + JSON.stringify(cmd));
        if (!_.isEmpty(self._maestro)) {
            log.warn('Sending servo command down to stdin of maestro.');
            self._maestro.stdin.write(cmd.servo+","+cmd.pos+'\r\n');//just send down raw
        }
        else {
            log.error("Raspy error. Maestro object null.");
        }
    }
}//Raspy

module.exports = Raspy;
