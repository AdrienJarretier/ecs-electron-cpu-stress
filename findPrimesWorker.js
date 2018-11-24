'use strict';

onmessage = function (e) {

    let coresInfos = e.data;

    let nbCores = coresInfos[0];
    let myThreadId = coresInfos[1];
    console.log('Message received from main script : ' + nbCores + ', ' + myThreadId);


    let INITIAL = Number.MAX_SAFE_INTEGER - 2 * myThreadId
    // INITIAL = 100


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

        currentInt -= 2 * nbCores;

        if (currentInt < 3) {
            // console.log('----------------')
            // console.log(piX);
            initCurrentInt();
        }

    }

}
