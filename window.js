'use strict'

const wmiTemp = require('./wmiTemp.js')
const chartTemp = require('./chartTemp.js')

let timeStart = 0
let currentTime = 0

const SAMPLE_PERIOD = 400

function handleTemp(tempSensors) {

    // console.log(tempSensors)

    $('#field').empty()

    for (let sensor of tempSensors) {

        for (let k in sensor) {

            let v = sensor[k]

            $('#field').append(k + ' : ' + v + '<br>')

        }

        if (sensor.Name == "CPU Package") {


            chartTemp.updateChart(currentTime - timeStart, sensor.Value, SAMPLE_PERIOD / 2)

            ++currentTime

        }

        $('#field').append('<br>')

    }


}



$(() => {

    chartTemp.drawChart()

    setInterval(() => {

        wmiTemp.getTemperatures(handleTemp);

    }, SAMPLE_PERIOD);


})
