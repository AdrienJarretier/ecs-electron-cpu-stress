'use strict'

var wmi = require('node-wmi');

function getTemperatures() {



}

wmi.Query({
    class: 'Sensor',
    namespace: 'root\\OpenHardwareMonitor'
}, function (err, temperature_infos) {

    for (let sensor of temperature_infos) {
        // console.log(sensor.SensorType)
        if (sensor.SensorType == 'Temperature') {
            console.log(sensor)
            // console.log(sensor.Name + ' : ' + sensor.Value)
        }
    }

});