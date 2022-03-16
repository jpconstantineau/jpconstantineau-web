/////////////////////////////////////////////////////////////////////
// The table generation function
function tabulate(selector, data, columns) {
    var table = d3.select(selector).append("table")
            .attr("class", "pure-table"),
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
/////////////////////////////////////////////////////////////////////
// The table generation function
function tabulatejson(selector, data, columns, selectedrows) {
  console.log("In tabulatejson")
    var table = d3.select(selector).append("table")
            .attr("class", "pure-table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(data)
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
/////////////////////////////////////////////////////////////////////

function getpointsfromgeometry (frame){
var data = {};

// use chainstay and bb drop
data.bbx = 800;
data.bwy = 340;
data.bby = data.bwy - frame.bbdrop;
data.bwx = data.bbx - (Math.pow((frame.chainstay*frame.chainstay - frame.bbdrop*frame.bbdrop),(1/2)));

// use wheelbase
data.fwy = data.bwy;
data.fwx = data.bwx + frame.wheelbase;

// use stack and reach to get top of headtube
data.httx = data.bbx + frame.reach;
data.htty = data.bby + frame.stack;

// use headtube angle and length to get bottom of headtube
data.htbx = data.httx + frame.headtube * Math.cos(frame.headangle*Math.PI/180);
data.htby = data.htty - frame.headtube * Math.sin(frame.headangle*Math.PI/180);

// use seat tube angle and length to get top of seat tube
data.sttx = data.bbx - frame.seattube * Math.cos(frame.seatangle*Math.PI/180);
data.stty = data.bby + frame.seattube * Math.sin(frame.seatangle*Math.PI/180);

// use spacers and stemstack
data.stemx = data.httx - (frame.spacers + frame.stemstack/2) * Math.cos(frame.headangle*Math.PI/180);
data.stemy = data.htty + (frame.spacers + frame.stemstack/2) * Math.sin(frame.headangle*Math.PI/180);

data.handlebarsx = data.stemx + (frame.stemlength) * Math.cos(((90-frame.headangle)+frame.stemangle)*Math.PI/180);
data.handlebarsy = data.stemy + (frame.stemlength) * Math.sin(((90-frame.headangle)+frame.stemangle)*Math.PI/180);
//683 = bb-saddle distance along tube for pierre
//651 = bb-saddle distance along tube for Sylvie
data.seatpostx = data.bbx -   frame.bbsaddle * Math.cos(frame.seatangle*Math.PI/180);
data.seatposty = data.bby + frame.bbsaddle * Math.sin(frame.seatangle*Math.PI/180);
if (frame.saddleheight>= 0)
{
  console.log("Calculating Saddle Distance from Bottom Bracket for"+ frame.brand+" "+ frame.model +" "+ frame.size);
  var tmp = frame.saddleheight/Math.sin(frame.seatangle*Math.PI/180);
  console.log(tmp);
}
data.saddlefrontx = data.bbx - frame.bbsetback ;
data.saddlefronty = data.seatposty;

data.saddlebackx = data.saddlefrontx -frame.saddlelength;
data.saddlebacky = data.saddlefronty;

data.saddlerailfrontx = data.saddlefrontx - frame.saddlerailfront;
data.saddlerailfronty = data.saddlefronty - frame.saddlerailstop;
data.saddlerailbackx = data.saddlerailfrontx - frame.saddleraillength;
data.saddlerailbacky = data.saddlerailfronty;

data.hoodsx = data.handlebarsx + frame.hbreach - 12.5;
data.hoodsy = data.handlebarsy +  30;

data.dropsx = data.handlebarsx -  50;
data.dropsy = data.handlebarsy -   frame.hbdrop  -11 ;


 return data
}


/////////////////////////////////////////////////////////////////////
function getlines(points)
{
var data = [];


  
}

/////////////////////////////////////////////////////////////////////
var svgx = 140*7;
var svgy = 100*7;
var svgContainer = d3.select("div#bike_picture").append("svg")
                                    .attr("width", svgx)
                                    .attr("height",svgy);

var xScale = d3.scale.linear().domain([0,1400]).range([0,svgx]);
var yScale = d3.scale.linear().domain([0,1000]).range([svgy,0]);

/*

var pipeslinesAttributes = pipeslines
                       .attr("x1", function (d) { return d.y_axis1*12; })
                       .attr("x2", function (d) { return d.y_axis2*12; })
                       .attr("y1", function (d) { return d.x_axis1*12; })
                       .attr("y2", function (d) { return d.x_axis2*12; })
                       .attr("class", function (d) { return d.class; });
*/

d3.json("data/bikes.json", function(data) {
  //console.log(data);

var filtered_bikes_list = data.filter(function(bike_item){
    return bike_item.display;
});

 var keyFn = function(d) { return d.key }
////////////////////////////////////////////////////////////////////////////
// define the function with the data-manipulation code
function refreshData(updateddata) {
  console.log("in refreshdata")
  console.log(updateddata);
  //tabulatejson("div#bike_specs", updateddata, ["",""], "");
  var bikes =  d3.select("svg").selectAll("g")
               .data(updateddata, keyFn );
                
var      bikesenter=bikes.enter().append("svg:g")
                          .attr("class","bikes");

           bikes.exit().remove();
  
                          
var bike_pointa =  bikesenter.selectAll("circle .bw")
                          .data(function(row) {
                            var points = getpointsfromgeometry(row);
                                return [
                                  {x: (xScale(points.bwx)),  y: (yScale(points.bwy))},
                                  {x: (xScale(points.bbx)),  y: (yScale(points.bby))},
                                  {x: (xScale(points.fwx)),  y: (yScale(points.fwy))},
                                  {x: (xScale(points.sttx)), y: (yScale(points.stty))},
                                  {x: (xScale(points.httx)), y: (yScale(points.htty))},
                                  {x: (xScale(points.htbx)), y: (yScale(points.htby))},
                                  {x: (xScale(points.stemx)), y: (yScale(points.stemy))},
                                  {x: (xScale(points.handlebarsx)), y: (yScale(points.handlebarsy))},
                                  {x: (xScale(points.dropsx)),y: (yScale(points.dropsy))},
                                  {x: (xScale(points.hoodsx)),y: (yScale(points.hoodsy))},
                                  {x: (xScale(points.seatpostx)),   y: (yScale(points.seatposty))},
                                  {x: (xScale(points.saddlefrontx)),y: (yScale(points.saddlefronty))},
                                  {x: (xScale(points.saddlebackx)), y: (yScale(points.saddlebacky))},
                                  {x: (xScale(points.saddlerailfrontx)), y: (yScale(points.saddlerailfronty))},
                                  {x: (xScale(points.saddlerailbackx)), y: (yScale(points.saddlerailbacky))}
                                  ]})
var bike_point = bike_pointa.enter()
                          .append("circle")
                          .classed("bw",true);


var bike_point_at = bike_point
                               .attr("cx", function (d) { return d.x; })
                               .attr("cy", function (d) {return d.y; })
                               .attr("r", function (d) { return 2; });

var bike_linea = bikesenter.selectAll("line .tubes")
                          .data(function(row) {
                            var points = getpointsfromgeometry(row);
                                return [
                                  {x1: (xScale(points.bwx)),  y1: (yScale(points.bwy)), x2: (xScale(points.bbx)),  y2: (yScale(points.bby)) },
                                  {x1: (xScale(points.bwx)),  y1: (yScale(points.bwy)), x2: (xScale(points.sttx)), y2: (yScale(points.stty))},
                                  {x1: (xScale(points.fwx)),  y1: (yScale(points.fwy)), x2: (xScale(points.htbx)), y2: (yScale(points.htby))},
                                  {x1: (xScale(points.bbx)),  y1: (yScale(points.bby)), x2: (xScale(points.htbx)), y2: (yScale(points.htby))},
                                  {x1: (xScale(points.bbx)),  y1: (yScale(points.bby)), x2: (xScale(points.sttx)), y2: (yScale(points.stty))},
                                  {x1: (xScale(points.sttx)), y1: (yScale(points.stty)),x2: (xScale(points.httx)), y2: (yScale(points.htty))},
                                  {x1: (xScale(points.sttx)), y1: (yScale(points.stty)),x2: (xScale(points.seatpostx)), y2: (yScale(points.seatposty))},
                                  {x1: (xScale(points.httx)), y1: (yScale(points.htty)),x2: (xScale(points.htbx)), y2: (yScale(points.htby))},
                                  {x1: (xScale(points.httx)), y1: (yScale(points.htty)),x2: (xScale(points.stemx)), y2: (yScale(points.stemy))},
                                  {x1: (xScale(points.saddlebackx)), y1: (yScale(points.saddlebacky)),x2: (xScale(points.saddlefrontx)), y2: (yScale(points.saddlefronty))},
                                  {x1: (xScale(points.saddlerailbackx)), y1: (yScale(points.saddlerailbacky)),x2: (xScale(points.saddlerailfrontx)), y2: (yScale(points.saddlerailfronty))},
                                  {x1: (xScale(points.handlebarsx)), y1: (yScale(points.handlebarsy)),x2: (xScale(points.stemx)), y2: (yScale(points.stemy))}
                                  ]});
var bike_line = bike_linea.enter()
                          .append("line")
                          .classed("tubes",true);

var bike_line_at = bike_line
                       .attr("x1", function (d) { return d.x1; })
                       .attr("x2", function (d) { return d.x2; })
                       .attr("y1", function (d) { return d.y1; })
                       .attr("y2", function (d) { return d.y2; })
                       .attr("class", function (d) { return "line"; });


/*

  var bike_lineb = bike_linea.exit()
.selectAll("line .tubes").remove();

bike_lineb.remove();
*/
  
  
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// call the function once
refreshData(filtered_bikes_list);
var bikesselector = d3.select("div#bike_selector").append("ul").classed("pure-menu-list",true);
var bikesselectorlabel =  bikesselector.selectAll("li .selector_label")
                          .data(data)
                          .enter()
                          .append("li")
                          .classed("selector_label",true)
                          .classed("pure-menu-item",true);
                          
                          

var     bikesselectorinput = bikesselectorlabel
                              .append("input")
                              .attr("type", "checkbox")
                              .attr("value", function(d){return (d.key)})
                              .property("checked", function(d){return d.display})
                              .classed("selector",true) ;
                              
var     bikesselectortest = bikesselectorlabel
                              .append("span")
                              .html(function(d) { return (d.brand + " "+d.model + " " + d.size); });

                              

d3.selectAll(".selector").on("change", function() {
  var type = this.value;
  
  if (this.checked) { // adding data points (not quite right yet)
    
    var new_bikes = data.filter(function(bike_item){ return bike_item.key == type;});
    filtered_bikes_list = filtered_bikes_list.concat(new_bikes);
    
  } else { // remove data points from the data that match the filter

    filtered_bikes_list = filtered_bikes_list.filter(function(bike_item){ return bike_item.key != type;});
      }
      
  refreshData(filtered_bikes_list);
});
    
//     <label><input type="checkbox" name="region" class="region_cb" value="Sub-Saharan Africa" checked="checked"/> Sub-Saharan Africa</label>
                                  

//console.log(bikes);

   var headsTable = tabulate("div#bike_list", data, ["brand", "model" , "size","seattube", "toptube", "headtube",  "headangle","seatangle",  "bbdrop",  "chainstay",  "wheelbase",  "stack", "reach", "stemstack","stemlength","stemangle","spacers","bbsaddle"]);
  
  
  
  
});

