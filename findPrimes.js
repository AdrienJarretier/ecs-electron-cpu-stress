'use strict';

console.log('nb cores :' + navigator.hardwareConcurrency);

let nbCores = 1;


for (let i = 0; i < nbCores; ++i) {

    let myWorker = new Worker('findPrimesWorker.js');
    myWorker.postMessage([nbCores, i]);
}