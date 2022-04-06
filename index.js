const endpoint = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

document.addEventListener('DOMContentLoaded', function(){
    const request = new XMLHttpRequest();
    request.open("GET", endpoint, true);
    request.send();
    request.onload = function(){

        let width = 800;
        let height = 400;
        let barWidth = width / 275;

        let svgContainer = d3
        .select('.bar-chart')
        .append('svg')
        .attr("viewBox", `0 0 ${width + 100} ${height + 60}`);

        // parse response to JSON
        const json = JSON.parse(request.responseText);

        // create array of date values
        const yearDates = json.data.map((item) => new Date(item[0]));

        // set max date to current date
        const maxX = new Date()

        // find min of date values
        const minX = d3.min(yearDates);

        // create scale for x-axis
        const xScale = d3.scaleTime()
        .domain([minX, maxX])
        .range([0, width]);

        // create x-axis
        const xAxis = d3.axisBottom().scale(xScale);
        
        // append x-axis to svg
        svgContainer.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(60, 420)")

        // create array of gdp values
        let GDP = json.data.map((item) => item[1]);

        // find max gdp value
        // add additional amount to give padding
        const maxY = d3.max(GDP) + 1000;

        // scale gdp data values to fit within SVG area
        const linearScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([0, height]);

        // apply scale to gdp data 
        GDP = GDP.map((item) => linearScale(item));

        // create scale for y-axis
        const yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height, 0]);

        // create y-axis
        const yAxis = d3.axisLeft(yScale);

        // append y-axis to svg
        svgContainer.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(60, 20)');

        const tooltip = d3
        .select(".container")
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "card")
        .style("opacity", 0);

        // add bars
        d3.select("svg")
        .selectAll("rect")
        .data(GDP)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(yearDates[i]) + 60)
        .attr("y", (d) => height - d + 19.5)
        .attr("width", barWidth)
        .attr("height", (d) => d)
        .attr("class", "bar")
        .attr("data-date", (d,i) => json.data[i][0])
        .attr("data-gdp", (d,i) => json.data[i][1])
        .attr("fill", "#db3e3e")
        .attr("index", (d,i) => i)
        .on("mouseover", (event, d) => {
            
            // get the index value of the moused over bar
            let index = event.target.attributes.index.value;
            
            // fade the tool tip into view
            tooltip
            .transition()
            .duration(200)
            .style('opacity', 1);
            
            // use the index value to populate the tool tip with info
            tooltip
            .html(`${json.data[index][0]} <br> $${json.data[index][1]} billion`)
            .attr("data-date", json.data[index][0]);
        })
        .on("mouseout", () => {

            // fade the tool tip out of view
            tooltip
            .transition()
            .duration(200)
            .style("opacity", 0);
        });

    };
});
