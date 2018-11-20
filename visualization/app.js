// TODO
function doScatterPlot(myData, svg) {
    debugger;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = + svg.style("width") - margin.left - margin.right;
    const height = + svg.style("height") - margin.top - margin.bottom; // You were missing a ; here

    const x = d3.scaleLinear()
        .domain([0, d3.max(myData, d => d.length)])
        .range([0, width]);

    const rects = svg.selectAll(".bar")
        .data(myData.sort( (a,b) => d3.descending(a.length, b.length)) );

    rects.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", (d,i, ds) => i*10)
        .attr("width", d => x(d.length))
        .attr("height", 10)
        .style("fill", "steelblue");


    const texts = svg.selectAll(".label")
        .data(myData);



    rects.enter()
        .append("text")
        .attr("class", "label")
        .attr("x", 0)
        .attr("y", (d,i, ds) => i*10)

        // .attr("x", d => x(d.censo))
        //.attr("y", (d) => y(d.municipio))
        .text( d=> d.author + ': ' + d.length)
        // .attr("width", d => x(d.censo))
        // .attr("height", 9)
        .style("fill", "#333")
        .style("font-size", "6pt")
        .style("font-family", "sans-serif");


    console.log("w", width, "h", height);

}






// Returns a promise, you don't get the data straight from it
d3.json("../out/posts/amirh.json")
    .then( data => {
        const svg = d3.select("#viz")
        debugger;
        console.log(svg.width)
        doScatterPlot(data, svg);
        //   doScatterPlot(data, d3.select("#viz2"));
    });



