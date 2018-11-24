'use strict';

onmessage = function (e) {

    let coresInfos = e.data;

    let nbOfWorkers = coresInfos[0];
    let myThreadId = coresInfos[1];
    console.log('Message received from main script : ' + nbOfWorkers + ', ' + myThreadId);


    let INITIAL = Number.MAX_SAFE_INTEGER;

    INITIAL -= 2 * myThreadId;


    let currentInt;
    let piX = 0;

    function initCurrentInt() {

        currentInt = (INITIAL % 2 == 1 ? INITIAL : INITIAL - 1);
        piX = 0;

    }



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
            console.log(myThreadId + ' : ' + currentInt);
        }

        currentInt -= 2 * nbOfWorkers;

        if (currentInt < 3) {
            // console.log('----------------')
            // console.log(piX);
            initCurrentInt();
        }

    }

}
