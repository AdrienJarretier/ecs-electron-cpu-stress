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

function parseSensors(tempSensors) {

    for (let sensor of tempSensors) {
        if (sensor.Name == "CPU Package") {

            let temperatureValue = sensor.Value;

            return temperatureValue;

        }
    }

}

function handleTemp(tempSensors) {

    let temperatureValue = parseSensors(tempSensors);

    let elapsedTime = Date.now() - timeStart

    if (temperatureValue > maxTemp) {

        maxTemp = temperatureValue;
        lastMaxTempUpdate = Date.now();

        $('#max-temp').text(maxTemp);

        let cellTime = $('<td>').text(((lastMaxTempUpdate - timeStart) / 1000));
        let cellTemp = $('<td>').text(maxTemp);

        let row = $('<tr>');
        row.append(cellTime);
        row.append(cellTemp);

        $('#max-temp-updates-history').append(row);

    }

    chartTemp.updateChart(elapsedTime / SAMPLE_PERIOD, temperatureValue, maxTemp);

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

function initChart(tempSensors) {

    let temperatureValue = parseSensors(tempSensors);

    chartTemp.drawChart(TIME_WINDOW, temperatureValue);

}


$(

    setTimeout(_ => {

        wmiTemp.getTemperatures(initChart)
            .then(() => {

                wmiTemp.getTemperatures(handleTemp);

                updateMaxTempTime();

                findPrimes.startWorkers();

                $('#heat-up-button').click(() => {

                    findPrimes.startWorkers();

                });

                $('#cool-down-button').click(() => {

                    findPrimes.stopWorkers();

                });

            });


    }, 3000)

);
