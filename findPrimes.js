'use strict';

let workers = [];

function startWorkers() {

    let nbCores = navigator.hardwareConcurrency;

    console.log('nb cores :' + nbCores);

    let nbOfWorkers = nbCores;

    while (workers.length < nbOfWorkers) {

        let myWorker = new Worker('findPrimesWorker.js');

        workers.push(myWorker);

    }

    for (let i = 0; i < nbOfWorkers; ++i) {

        workers[i].postMessage({
            type: 'START_PARAMETERS',
            values: [nbOfWorkers, i]
        });
    }

}
exports.startWorkers = startWorkers;

function stopWorkers() {

    for (let w of workers) {

        w.terminate();

    }

}
exports.stopWorkers = stopWorkers;