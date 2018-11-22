'use strict'

var wmi = require('node-wmi')

function wmiTemperaturesQuery() {

    return new Promise(resolve => {

        wmi.Query({
            class: 'Sensor',
            namespace: 'root\\OpenHardwareMonitor'
        }, function (err, temperature_infos) {

            let sensors = []

            for (let sensor of temperature_infos) {

                if (sensor.SensorType == 'Temperature') {

                    sensors.push(sensor)

                }
            }

            resolve(sensors)

        })


    })

}

async function getTemperatures(handleTemprature) {

    let temp = await wmiTemperaturesQuery()

    return handleTemprature(temp)

}

exports.getTemperatures = getTemperatures
