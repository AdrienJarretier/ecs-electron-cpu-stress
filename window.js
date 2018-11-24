'use strict'

const wmiTemp = require('./wmiTemp.js')
const chartTemp = require('./chartTemp.js')
const findPrimes = require('./findPrimes.js');

const TIME_WINDOW = 300;

const SAMPLE_PERIOD = 1000

let timeStart = Date.now()
// let expectedUpdate = Date.now() + SAMPLE_PERIOD
let lastUpdate

let maxTemp = 0;

function handleTemp(tempSensors) {

    // console.log(tempSensors)

    // $('#field').empty()

    let elapsedTime = Date.now() - timeStart

    // lastUpdate = Date.now()

    for (let sensor of tempSensors) {

        // for (let k in sensor) {

        //     let v = sensor[k]

        //     $('#field').append(k + ' : ' + v + '<br>')

        // }

        if (sensor.Name == "CPU Package") {

            // elapsedTime = lastUpdate - timeStart

            maxTemp = Math.max(sensor.Value, maxTemp);

            chartTemp.updateChart(elapsedTime / SAMPLE_PERIOD, sensor.Value, maxTemp);

        }

        // $('#field').append('<br>')

    }

    // let missingTime = lastUpdate - expectedUpdate

    // expectedUpdate += SAMPLE_PERIOD

    setTimeout(() => {


        wmiTemp.getTemperatures(handleTemp);

    }, SAMPLE_PERIOD);


}



$(() => {

    chartTemp.drawChart(TIME_WINDOW);

    setTimeout(() => {

        wmiTemp.getTemperatures(handleTemp);

    }, SAMPLE_PERIOD);

    findPrimes.startWorkers();


})
