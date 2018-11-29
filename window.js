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

function loadSpinning() {

    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    // Returns a tween for a transition’s "d" attribute, transitioning any selected
    // arcs from their current angle to the specified new angle.
    function arcTween(newAngle, angle) {
        return function (d) {
            var interpolate = d3.interpolate(d[angle], newAngle);
            return function (t) {
                d[angle] = interpolate(t);
                return arc(d);
            };
        };
    }

    const animationTime = 3000;
    const loaderRadius = 64;
    const loaderColor = 'rgb(100,100,100)';

    var arc = d3.arc()
        .innerRadius(loaderRadius - 16)
        .outerRadius(loaderRadius);

    let svgWidth = 600,
        svgHeight = 300;

    var svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    let g = svg.append("g").attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

    var loader = g.append("path")
        .datum({ endAngle: 0, startAngle: 0 })
        .style("fill", loaderColor)
        .attr("d", arc);

    loader.datum({ endAngle: 0, startAngle: 0 })

    loader.transition()
        .duration(animationTime)
        .ease(d3.easeSinIn)
        .attrTween("d", arcTween(degToRad(360), 'endAngle'))
        .on("end", _ => {



            wmiTemp.getTemperatures(initChart)
                .then(() => {

                    loader
                    .attr("fill-opacity", 1)
                    .attr("stroke-opacity", 1)
                    .transition()
                        .duration(1000)
                        //change fill and stroke opacity to avoid CSS conflicts
                        .attr("fill-opacity", 0)
                        .attr("stroke-opacity", 0)
                        .remove(); //remove after transitions are complete

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




        });



}


$(loadSpinning);
