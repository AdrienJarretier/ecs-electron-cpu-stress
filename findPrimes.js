'use strict';

function startWorkers() {

    console.log('nb cores :' + navigator.hardwareConcurrency);

    let nbCores = 3;


    for (let i = 0; i < nbCores; ++i) {

        let myWorker = new Worker('findPrimesWorker.js');
        myWorker.postMessage([nbCores, i]);
    }

}
exports.startWorkers = startWorkers;