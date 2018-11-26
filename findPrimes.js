'use strict';

let workers = [];

let benchmarkValuesReceived = 0;
let sumBenchmarkValues = 0;

function startWorkers() {

    let startTime = Date.now();

    let nbCores = navigator.hardwareConcurrency;

    console.log('nb cores :' + nbCores);

    let nbOfWorkers = nbCores;

    benchmarkValuesReceived = 0;
    sumBenchmarkValues = 0;

    while (workers.length < nbOfWorkers) {

        let myWorker = new Worker('findPrimesWorker.js');

        myWorker.onmessage = function (e) {

            console.log(e);

            switch (e.data.type) {
                case 'BENCHMARK_VALUE':

                    let benchmarkValue = e.data.values[0];

                    sumBenchmarkValues += benchmarkValue;

                    ++benchmarkValuesReceived;

                    if (benchmarkValuesReceived == nbOfWorkers) {

                        // add row to table

                        let cellTime = $('<td>').text(((Date.now() - startTime) / 60000));
                        let cellValue = $('<td>').text(sumBenchmarkValues);

                        let row = $('<tr>');
                        row.append(cellTime);
                        row.append(cellValue);

                        $('#benchmarkValues').append(row);

                        benchmarkValuesReceived = 0;
                        sumBenchmarkValues = 0;

                    }

                    break;
            }
        }

        workers.push(myWorker);

    }

    for (let i = 0; i < nbOfWorkers; ++i) {

        workers[i].postMessage({
            type: 'START_PARAMETERS',
            values: [nbOfWorkers, i, startTime]
        });
    }

}
exports.startWorkers = startWorkers;

function stopWorkers() {

    while (workers.length > 0) {

        workers.pop().terminate();

    }

}
exports.stopWorkers = stopWorkers;