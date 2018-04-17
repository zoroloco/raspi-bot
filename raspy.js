var pathUtil = require('path'),
    log      = require(pathUtil.join(__dirname,'./logger.js')),
    cp       = require('child_process'),
    _        = require('underscore');

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
        //self._maestro = cp.spawn('python', [self._cmd]);
        self._maestro.stdin.setEncoding('utf-8');

        self._maestro.stdout.on('data', (data) => {
            log.info('raspy received stdout from maestro:'+data);
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

    Raspy.prototype.sendCommand = function(cmd){
        var self = this;
        log.info("Raspy got command:" + JSON.stringify(cmd));
        if (!_.isEmpty(self._maestro)) {
            log.warn('Sending command down to stdin of maestro.');
            self._maestro.stdin.write(cmd.servo+","+cmd.pos);//just send down raw
        }
        else {
            log.error("Raspy error. Maestro object null.");
        }
    }
}//Raspy

module.exports = Raspy;