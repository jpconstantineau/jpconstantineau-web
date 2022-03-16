// process data to get pipe and trench lengths.
jsonPipes.forEach(function(pipe) {
    pipe.length =  Math.pow(((pipe.y_axis2 - pipe.y_axis1)*(pipe.y_axis2 - pipe.y_axis1) + (pipe.x_axis2 - pipe.x_axis1)*(pipe.x_axis2 - pipe.x_axis1)),1/2);
    console.log(pipe.length);
});

jsonTrenches.forEach(function(pipe) {
    pipe.length =  Math.pow(((pipe.y_axis2 - pipe.y_axis1)*(pipe.y_axis2 - pipe.y_axis1) + (pipe.x_axis2 - pipe.x_axis1)*(pipe.x_axis2 - pipe.x_axis1)),1/2);
    console.log(pipe.length);
});

var svgContainer = d3.select("div#housediv").append("svg")
                                    .attr("width", 1320)
                                    .attr("height", 528);

// trenches first

var trenchlines = svgContainer.selectAll("line .trenchline")
                          .data(jsonTrenches)
                          .enter()
                          .append("line")
                          .classed("trenchline",true);
                    

var trenchlinesAttributes = trenchlines
                       .attr("x1", function (d) { return d.y_axis1*12; })
                       .attr("x2", function (d) { return d.y_axis2*12; })
                       .attr("y1", function (d) { return d.x_axis1*12; })
                       .attr("y2", function (d) { return d.x_axis2*12; })
                       .attr("class", function (d) { return d.class; });

// Pipes next
var pipeslines = svgContainer.selectAll("line .pipes")
                          .data(jsonPipes)
                          .enter()
                          .append("line")
                          .classed("pipes",true);
                    

var pipeslinesAttributes = pipeslines
                       .attr("x1", function (d) { return d.y_axis1*12; })
                       .attr("x2", function (d) { return d.y_axis2*12; })
                       .attr("y1", function (d) { return d.x_axis1*12; })
                       .attr("y2", function (d) { return d.x_axis2*12; })
                       .attr("class", function (d) { return d.class; });


// grass next

// new strutures next
var newstructureslines = svgContainer.selectAll("line .newstructures")
                          .data(jsonNewStructuresLines)
                          .enter()
                          .append("line")
                          .classed("newstructures",true);
                    

var newstructureslineAttributes = newstructureslines
                       .attr("x1", function (d) { return d.y_axis1*12; })
                       .attr("x2", function (d) { return d.y_axis2*12; })
                       .attr("y1", function (d) { return d.x_axis1*12; })
                       .attr("y2", function (d) { return d.x_axis2*12; })
                       .attr("class", function (d) { return d.class; });

var newstructuresrectangles = svgContainer.selectAll("rect .newstructures")
                          .data(jsonNewStructuresRectangles)
                          .enter()
                          .append("rect")
                          .classed("newstructures",true);
                    

var newstructuresrectanglesAttributes = newstructuresrectangles
                       .attr("x", function (d) { return d.y_axis*12; })
                       .attr("y", function (d) { return d.x_axis*12; })
                       .attr("height", function (d) { return d.width*12; })
                       .attr("width", function (d) { return d.height*12; })
                       .attr("class", function (d) { return d.class; });

// heads
        var headscircles = svgContainer.selectAll("circle .heads")
                                  .data(jsonHeads)
                                  .enter()
                                  .append("circle")
                                  .classed("heads",true);
        
        var headcirclesAttributes = headscircles
                               .attr("cx", function (d) { return d.y_axis*12; })
                               .attr("cy", function (d) { return d.x_axis*12; })
                               .attr("r", function (d) { return d.radius; })
                               .attr("class", function (d) { return d.class; });

// permanent strutures

var structurescircles = svgContainer.selectAll("circle .structures")
                          .data(jsonStructuresCircles)
                          .enter()
                          .append("circle")
                          .classed("structures",true);

var structurescirclesAttributes = structurescircles
                       .attr("cx", function (d) { return d.y_axis*12; })
                       .attr("cy", function (d) { return d.x_axis*12; })
                       .attr("r", function (d) { return d.radius; })
                       .attr("class", function (d) { return d.class; });
                    
var structureslines = svgContainer.selectAll("line .structures")
                          .data(jsonStructuresLines)
                          .enter()
                          .append("line")
                          .classed("structures",true);
                    

var structureslineAttributes = structureslines
                       .attr("x1", function (d) { return d.y_axis1*12; })
                       .attr("x2", function (d) { return d.y_axis2*12; })
                       .attr("y1", function (d) { return d.x_axis1*12; })
                       .attr("y2", function (d) { return d.x_axis2*12; })
                       .attr("class", function (d) { return d.class; });

var structuresrectangles = svgContainer.selectAll("rect .structures")
                          .data(jsonStructuresRectangles)
                          .enter()
                          .append("rect")
                          .classed("structures",true);
                    

var structuresrectanglesAttributes = structuresrectangles
                       .attr("x", function (d) { return d.y_axis*12; })
                       .attr("y", function (d) { return d.x_axis*12; })
                       .attr("height", function (d) { return d.width*12; })
                       .attr("width", function (d) { return d.height*12; })
                       .attr("class", function (d) { return d.class; });


// The table generation function
function tabulate(selector, data, columns) {
    var table = d3.select(selector).append("table")
            .attr("style", "margin-left: 250px"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
//        .attr("style", "font-family: Courier") // sets the font style
          .html(function(d) { return d.value; });
    
    return table;
}

// render the table
 var headsTable = tabulate("div#headstablediv", jsonHeads, ["type", "x_axis" , "y_axis"]);
 var pipesTable = tabulate("div#pipestablediv", jsonPipes, ["class", "length" ]);
 var trenchesTable = tabulate("div#trenchestablediv", jsonTrenches, ["class", "length" ]);
