'use strict';

function start(nbOfWorkers, myThreadId, startTime) {

    const UPDATE_INTERVAL = 60000;

    let nextUpdate = startTime + UPDATE_INTERVAL;

    console.log('Message received from main script : ' + nbOfWorkers + ', ' + myThreadId);


    let INITIAL = Number.MAX_SAFE_INTEGER;

    INITIAL -= 2 * myThreadId;


    let currentInt;
    let piX;

    function initCurrentInt() {

        currentInt = (INITIAL % 2 == 1 ? INITIAL : INITIAL - 1);
        piX = 0;

    }


    let benchValuePrimesFound = 0;

    initCurrentInt();

    console.log('starting while');
    console.log('myThreadId : ' + myThreadId);

    while (true) {

        let currentIntSqrt = Math.sqrt(currentInt);

        let isPrime = true;

        // console.log(currentInt);

        for (let divisor = 3; divisor <= currentIntSqrt; divisor += 2) {

            if (currentInt % divisor == 0) {
                isPrime = false;
                break;
            }

        }

        if (isPrime) {
            ++piX;
            ++benchValuePrimesFound;
            // console.log(myThreadId + ' : ' + currentInt);
        }

        currentInt -= 2 * nbOfWorkers;

        if (currentInt < 3) {
            // console.log('----------------')
            // console.log(piX);
            initCurrentInt();
        }


        if (Date.now() >= nextUpdate) {

            console.log(Date.now() - startTime);

            nextUpdate = nextUpdate + UPDATE_INTERVAL;

            postMessage({
                type: 'BENCHMARK_VALUE',
                values: [benchValuePrimesFound]
            });

        }

    }

}


onmessage = function (e) {

    console.log('e.data.type : ' + e.data.type);

    switch (e.data.type) {
        case 'START_PARAMETERS':

            let coresInfos = e.data.values;

            let nbOfWorkers = coresInfos[0];
            let myThreadId = coresInfos[1];
            let startTime = coresInfos[2];

            start(nbOfWorkers, myThreadId, startTime);
            break;
    }
}
