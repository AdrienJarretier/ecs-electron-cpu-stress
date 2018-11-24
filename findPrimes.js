'use strict';

let nbCores = navigator.hardwareConcurrency - 1;

for (let i = 0; i < nbCores; ++i) {

    let myWorker = new Worker('findPrimesWorker.js');
    myWorker.postMessage([nbCores, i]);
}