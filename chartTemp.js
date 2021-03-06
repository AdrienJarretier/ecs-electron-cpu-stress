'use strict';

var x
var y

var datas = []

var TIME_WINDOW;

var line;
var lineMaxTemp;

function drawChart(timeWindow, initTemperature) {

    TIME_WINDOW = timeWindow;

    for (let i = -TIME_WINDOW; i <= 0; ++i) {
        datas.push({

            date: i,
            value: initTemperature,
            valueMax: initTemperature

        })
    }

    line = d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.value) })
        .curve(d3.curveBasis);

    lineMaxTemp = d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.valueMax) })
        .curve(d3.curveBasis);

    var svgWidth = 600,
        svgHeight = 300;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);


    var g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")"
        );

    x = d3.scaleLinear().rangeRound([0, width]);

    y = d3.scaleLinear().rangeRound([height, 0]);



    let maxX = d3.max(datas, function (d) { return d.date })
    let minX = maxX - TIME_WINDOW
    x.domain([minX, maxX]);

    y.domain([Math.floor((initTemperature - 20) / 10) * 10, 85]);

    g.append("g")
        .attr("class", "axis x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain");

    g.append("g")
        .attr("class", "axis y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .attr("class", "path")
        .datum(datas)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    g.append("path")
        .attr("class", "pathMaxTemp")
        .datum(datas)
        .attr("fill", "none")
        .attr("stroke", "crimson")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineMaxTemp);

}
exports.drawChart = drawChart

function updateChart(xData, yData, yMaxTemp) {



    datas.push({

        date: xData,
        value: yData,
        valueMax: yMaxTemp

    })

    let maxX = d3.max(datas, function (d) { return d.date })
    let minX = maxX - TIME_WINDOW
    x.domain([minX, maxX]);


    // Select the section we want to apply our changes to
    var svg = d3.select("svg").transition();



    // Make the changes
    svg.select(".path")   // change the line
        // .duration(animationTime)
        .attr("d", line);

    svg.select(".pathMaxTemp")   // change the line
        // .duration(animationTime)
        .attr("d", lineMaxTemp);


    svg.select(".x.axis") // change the x axis
        // .duration(animationTime)
        .call(d3.axisBottom(x))


    // svg.select(".y.axis") // change the y axis
    //     // .duration(animationTime)
    //     .call(d3.axisLeft(y))



}
exports.updateChart = updateChart