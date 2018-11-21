'use strict'

const wmiTemp = require('./wmiTemp.js')
const chartTemp = require('./chartTemp.js')

function handleTemp(tempSensors) {

    // console.log(tempSensors)

    $('#field').empty()

    for (let sensor of tempSensors) {

        for (let k in sensor) {

            let v = sensor[k]

            $('#field').append(k + ' : ' + v + '<br>')

        }

        $('#field').append('<br>')

    }


}


// wmiTemp.getTemperatures(handleTemp);

$(() => {

    wmiTemp.getTemperatures(handleTemp);

})
