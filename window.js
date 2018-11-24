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
let lastMaxTempUpdate = Date.now();

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

            if (sensor.Value > maxTemp) {

                maxTemp = sensor.Value;
                lastMaxTempUpdate = Date.now();

                $('#max-temp').text(maxTemp);

                let cellTime = $('<td>').text(((lastMaxTempUpdate - timeStart) / 1000));
                let cellTemp = $('<td>').text(maxTemp);

                let row = $('<tr>');
                row.append(cellTime);
                row.append(cellTemp);

                $('#max-temp-updates-history').append(row);

            }

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

function updateMaxTempTime() {

    $('#max-temp-time-update').text((Date.now() - lastMaxTempUpdate) / 1000);

    setTimeout(() => {

        updateMaxTempTime();

    }, 100);

}



$(() => {

    chartTemp.drawChart(TIME_WINDOW);

    wmiTemp.getTemperatures(handleTemp);

    updateMaxTempTime();

    findPrimes.startWorkers();


})
