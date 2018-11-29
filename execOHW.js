const { spawn } = require('child_process');
const exec = require('child_process').exec;

exports.execOHW = function () {

    const isRunning = (query, cb) => {


        exec('tasklist', (err, stdout, stderr) => {
            cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
        });
    }



    isRunning('OpenHardwareMonitor.exe', (status) => {

        if (!status) {



            const child = spawn('OpenHardwareMonitor\\OpenHardwareMonitor.exe', [], {
                detached: true,
                stdio: 'ignore'
            });

            child.unref();


        }


    });



};