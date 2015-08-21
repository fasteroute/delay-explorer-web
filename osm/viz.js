
var data;
var stations;
var days = ["","M", "T", "W", "T", "F", "S", "S"];
var tbl;
var trains;
var routeDict={};
var color = d3.scale.quantize().range([
		"rgb(254,240,217)",
		"rgb(253,204,138)",
		"rgb(252,141,89)",
		"rgb(227,74,51)",
		"rgb(179,0,0)"]);
color.domain([0,20]);

var cell_size;

function plotGridWithData(data, rowHeaders) {

	d3.select("div#tables").selectAll("table").remove();
	var canvas_width = d3.select("div#viz").node().getBoundingClientRect().width
	var graph_width = canvas_width*0.5;
	cell_size = (graph_width - 12)/7;
	var tbl = d3.select("div#tables").append("table");
	var rows = tbl.selectAll("tr").data(data);
	rows.enter()
		.append("tr")
		.attr("schedule", function(d,i) {return rowHeaders[i].schedule;})
		.attr("route", function(d,i) {return rowHeaders[i].route;});
	var cells = rows.selectAll("td")
		.data(function(d,i) {
			return d;
		});

	/**
	  * Next we insert a div into each cell of the table
	  * This allows us to modify the appearance of the divs, while being able to change their backgrounds
	  * of the td elements behind them.
	*/

	cells.enter()
		.append("td")
		.style("padding","5px")
		.append("div")
		.style("background-color", function(d) { if(d==0) {return "rgb(49,163,84)"} else {return color(d)};})
		.classed("cell", true)
		.style("width", cell_size+'px')
		.style("height", cell_size+'px')

	// Adds days to top headers of the table
	// At this point no header elements exist yet.
	tbl.selectAll("th")
		.data(d3.range(0,days.length,1),function(d,i) {
			// Have to use a range rather than the actual days array
			// because d3 doesn't like duplicate values in arrays
			return i;
		})
		.enter()
    .insert("th", "tr")
		.append("div")
    .style("width", cell_size+'px')
		.style("text-align","center")
		.append("span")
		.text( function(d) {
			return days[d];
		});

	return tbl;
}

var stationDict = {};
var marker;
/**
 * createMapOverview() plots the set of the supplied train routes onto the map
 * also placing pins at the location of each station on each route.
 *
 * @param {[[String]]} routes
 * @param {[Object]} stations {lat,lon,crs,name}
 *
 */
function createMapOverview(routes, stations) {
	map.removeAllMarkers()
	map.removeAllPolylines()

	stations.forEach(function(elem,idx) {
		var latlon = new mxn.LatLonPoint(elem["lat"], elem["lon"]);
		latlon.crs = elem["crs"];
		latlon.name = elem["name"];
		stationDict[latlon.crs] = latlon;
	});

	var stnList = []
	routes.forEach(function(elem,idx) {

		stnList = [];
		elem.forEach(function(stn,indx) {
			stnList.push(stationDict[stn]);
		});

		var pline = new mxn.Polyline(stnList);
		var colr = "#1f40c2";
		pline.addData({color: colr, width:4});
		map.addPolyline(pline);
		routeDict[idx] = pline;


	});
	// Draw markers last so they are above routes
	for (var stn in stationDict) {

		marker = new mxn.Marker(stationDict[stn]);
		marker.addData({"icon": "pin.png"});
		marker.setIconSize([42,42]);
		map.addMarker(marker);
	}

}
/**
 *
 *  getTrainDayDetail() plots the delay histogram of trains on a particular day
 *  over the current time period.
 *
 *  @param {function} callback
 *  @return {SVGElement} detailSVG
 */
function getTrainDayDetail(callback) {

	var detailSVG = d3.select("svg#dayDetailGraph")

	detailSVG.selectAll("g").remove()
	var width = d3.select("div#dayDetail").node().getBoundingClientRect().width;
	var Containerheight = d3.select("#dayDetail").node().getBoundingClientRect().height;
	var title = d3.select("#dayDetailTitle")
	var Titleheight = title.node().clientHeight + 2*parseInt(title.style.marginTop || window.getComputedStyle(title.node()).marginTop);
	var height = Containerheight - Titleheight - 20;

	d3.json('daydetails.php', function(error, json) {


		d3.select("#dayDetail").style("height", Containerheight+"px");
		detailSVG
			.attr("width", width)
			.attr("height", height + 20);
		var yScale = d3.scale.ordinal()
			.domain(["On Time","15m Late", "30m Late", "Cancelled"])
			.rangeBands([0,height], .1)
		var bar = detailSVG
			.selectAll("g")
			.data(json["data"])
			.enter()
			.append("g")
			.attr("transform", function(d) {
				return "translate(0,"+yScale(d.period)+")";
			});
		var txt = bar.append("text")
			.text(function(d) { return d.period;})
			.attr("transform", "translate(0,"+yScale.rangeBand()/2+")")
			.attr("fill","black");
		var maxTxtLength=0;
		txt[0].forEach(function(node, inx) {
			if (node == null) {
				console.log('node was null');
				return;
			}
			ndWth = node.getBoundingClientRect().width
			if (maxTxtLength < ndWth) {
				maxTxtLength = ndWth;
			}
		});
		var xScale = d3.scale.linear()
			.domain([0,100])
			.range([maxTxtLength+5,width-10])
		var rects = bar.append("rect")
			.attr("width", function(d) {
				//return (d.value/100)*(width-maxTxtLength);
				return xScale(d.value) - (maxTxtLength + 5);
			})
			.attr("height", function(d) {
				return yScale.rangeBand();
			});

		maxTxtLength += 5;
		rects.attr("transform", "translate("+(maxTxtLength)+",0)");

		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")

		detailSVG.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (height) + ")")
			.call(xAxis)
		return callback(detailSVG);
	});


}

/**
 *
 * getTrainOverview() calls the api and provides coarse data on the perfomance of a
 * train on each day of the week, over the user-defined time period.
 *
 */
function getTrainOverview() {

	d3.json('trains.json', function(error, json) {

		var trains = json["trains"];
		var routes = json["routes"];
		var stations = json["stations"];

		var newTbl = plotGridWithData(json["data"], trains);

		createMapOverview(routes, stations);
		map.autoCenterAndZoom();

		// For trains add train and destination info
		var children = newTbl.node().childNodes;
		var counter = 0;
		for (j=0; j<children.length; j++) {
			curr_child = children[j];
			if (curr_child.tagName == "TR") {
				//curr_child.setAttribute("stn",counter)
					var rowHeader = document.createElement("th");
				rowHeader.innerHTML = trains[counter].name;
				counter++;
				rowHeader.setAttribute("class", "rowHeader");
				curr_child.insertBefore(rowHeader, curr_child.childNodes[0])
			}
		}

		d3.selectAll("td")
			.on("mouseover", function() {
				var current_cell = $(this);
				getTrainDayDetail(function(svg) {
          var svgHTML = $('<div>').append($(svg.node()).clone()).html();
					current_cell.webuiPopover({
						type: 'html',
						title:'Last 4 weeks',
						content:svgHTML,
						trigger:'manual',
						width: svg.node().getBoundingClientRect().width + 30,
						height:svg.node().getBoundingClientRect().height + 20
					})

					current_cell.webuiPopover('show');

				});
			});
		d3.selectAll('td,th')
			.on("mouseout", function() {

				$('td').webuiPopover('destroy')

      })
		d3.selectAll('table,th,tr')
			.on("mouseover", function() {

				$('td').webuiPopover('destroy')

      })


		// Add event listener to table row for clicks
		// When clicks occur we want to insert our new rows seamlessly

		d3.selectAll('tr')
			.on("mouseover", function() {
				d3.select(this)
					.style("background-color","#ccc")
				var route_id = this.getAttribute("route");
				var curr_route = routeDict[parseInt(route_id)];
				curr_route.setColor("#28abe3");
				map.addPolyline(curr_route, true);

			})
			.on("mouseout", function() {
				d3.select(this)
					.style("background-color","transparent")
				var route_id = this.getAttribute("route");
				var curr_route = routeDict[parseInt(route_id)];
				curr_route.setColor("rgb(31, 64, 194)");
				map.addPolyline(curr_route, true);
			})
			.on("click", function() {


        // First of all we reset any previously shown data,

        var activeTrain = d3.select(".active-train")
        if (activeTrain.empty() == false) {
          activeTrain.classed("active-train", false);
          d3.selectAll('[crs]').remove();

          if (activeTrain.node() == this) {
            return;
          }
        }

        // Now we create the new tables
				var schedule_id = this.getAttribute("schedule");
        var route_id = this.getAttribute("route");
				var selRow = this;

        // Special css for clicked train schedule
        d3.select(selRow).classed("active-train", true);

				var currRow = $(this)

				d3.json('stations.json?schedule='+schedule_id, function(error,json) {

					var stns = json["stations"];
					var data = json["data"];

          data.forEach( function(delays,index) {
            var newRow = d3.select('div#dummy').append('tr')
              .attr("crs", function() { return stns[index];})
              .attr("route", function() {return route_id;})
              .on("mouseover", function() {
                var route_id = this.getAttribute("route");
                var curr_route = routeDict[parseInt(route_id)];
                curr_route.setColor("#28abe3");
                map.addPolyline(curr_route, true);

              })
              .on("mouseout", function() {
                var route_id = this.getAttribute("route");
                var curr_route = routeDict[parseInt(route_id)];
                curr_route.setColor("rgb(31, 64, 194)");
                map.addPolyline(curr_route, true);
              })
              .on("click", function() {
                $('.active-train').click();

              })

            // Add row header for station name
            newRow
              .append("th")
              .classed("rowHeader",true)
              .text(function() {
                return stationDict[stns[index]].name
              })

              // Adds cells to existing row

              var delayRange = d3.range(0, delays.length)
              newRow.selectAll("td")
                .data(delayRange, function(index) {
                  return index;
                })
                .enter()
                .append("td")
							  .style("padding","5px")
                .append("div")
                .style("background-color", function(i) {
                  var d = delays[i];
                  if(d==0) {
                    return "rgb(49,163,84)";
                  } else {
                    return color(d);
                  }
                })
                .classed("cell", true)
                .style("width", cell_size+'px')
                .style("height", cell_size+'px')

                newRow = $(newRow.node());
                var newRowHTML = $('<div>').append(newRow.clone()).html();
                currRow.after(newRow);
                currRow = newRow;

          })
				});
			});

	/* Adds clearfix after tables to clear float
	d3.select("div#tables").append("div").style({"overflow": "auto","zoom": 1})
		// Adds station ids to markers on Map
		d3.selectAll("div[id^=OL_Icon]").attr("stn", function(d,i) {return i;})
		.on("mouseover", function() {
			var stn_id = this.getAttribute("stn");
			d3.select("tr[stn='"+stn_id+"']")
			.style("padding", "5px")
			.style("background-color", "rgba(40, 171, 227,0)")
			.transition()
			.duration(500)
			.style("background-color","rgba(31, 64, 194,1)")
			.style("color","white");
		})
	.on("mouseout", function() {
		var stn_id = this.getAttribute("stn");
		d3.select("tr[stn='"+stn_id+"']")
		.transition()
		.duration(750)
		.style("background-color","rgba(40, 171, 227,0)")
		.style("color","black")

	});
*/
	});
}
