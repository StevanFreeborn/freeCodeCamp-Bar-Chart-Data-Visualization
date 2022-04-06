let width = 800;
let height = 400;
let barWidth = width / 275;

let svgContainer = d3
    .select('.bar-chart')
    .append('svg')
    .attr('width', width + 100)
    .attr('height', height + 60);

const endpoint = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

document.addEventListener('DOMContentLoaded', function(){
    const request = new XMLHttpRequest();
    request.open("GET", endpoint, true);
    request.send();
    request.onload = function(){
        const json = JSON.parse(request.responseText);
        
        console.log(json.data);

        const minX = d3.min(json.data, (data) => data[0]);
        const maxX = d3.max(json.data, (data) => data[0]);
        console.log(minX, maxX);
        const xScale = undefined;
        const xAxis = undefined;

        const yScale = undefined;
        const yAxis = undefined;
    };
});