'use strict'

const wmiTemp = require('./wmiTemp.js')
const chartTemp = require('./chartTemp.js')

let timeStart = Date.now()

const SAMPLE_PERIOD = 1000

function handleTemp(tempSensors) {

    // console.log(tempSensors)

    $('#field').empty()

    for (let sensor of tempSensors) {

        // for (let k in sensor) {

        //     let v = sensor[k]

        //     $('#field').append(k + ' : ' + v + '<br>')

        // }

        if (sensor.Name == "CPU Package") {

            let elapsedTime = Date.now() - timeStart

            chartTemp.updateChart(elapsedTime / 1000, sensor.Value, SAMPLE_PERIOD)

            break;

        }

        // $('#field').append('<br>')

    }



    setTimeout(() => {

        wmiTemp.getTemperatures(handleTemp);

    }, SAMPLE_PERIOD);


}



$(() => {

    chartTemp.drawChart()

    setTimeout(() => {

        wmiTemp.getTemperatures(handleTemp);

    }, SAMPLE_PERIOD);


})
