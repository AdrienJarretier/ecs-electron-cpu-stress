'use strict';

function startWorkers() {

    let nbCores = navigator.hardwareConcurrency;

    console.log('nb cores :' + nbCores);

    let nbOfWorkers = nbCores - 1;

    for (let i = 0; i < nbOfWorkers; ++i) {

        let myWorker = new Worker('findPrimesWorker.js');
        myWorker.postMessage([nbOfWorkers, i]);
    }

}
exports.startWorkers = startWorkers;