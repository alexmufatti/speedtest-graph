var CronJob = require('cron').CronJob;
var exec = require('child_process').exec;
var cmd = '/usr/bin/speedtest-cli --simple';
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/speedtest');

var speedSchema = mongoose.Schema({
        date: Date,
        ping: Number,
        down: Number,
        up: Number
});

var Speed = mongoose.model('speed', speedSchema);

new CronJob('0 0 * * * *', function() {

    exec(cmd, function(error, stdout, stderr) {
        var lines = stdout.split('\n');
        
        if (lines.length == 4)
        {
            var ping = lines[0].split(' ')[1];
            var down = lines[1].split(' ')[1];
            var up = lines[2].split(' ')[1];

            var sp = new Speed({ date: new Date(), ping: ping, down: down, up: up });
            sp.save();
        }else
        {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log(stdout);
        }
    });

}, null, true, 'America/Los_Angeles');






