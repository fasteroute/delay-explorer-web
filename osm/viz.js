
var data;
var stations;
var days = ["","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var tbl;
var trains;
var color = d3.scale.quantize().range([
		"rgb(254,240,217)",
		"rgb(253,204,138)",
		"rgb(252,141,89)",
		"rgb(227,74,51)",
		"rgb(179,0,0)"]);
color.domain([0,20]);

function plotGridWithData(data, rowHeaders) {
	
	d3.select("div#tables").selectAll("table").remove();
	var canvas_width = d3.select("div#viz").node().getBoundingClientRect().width
		var graph_width = canvas_width*0.5;
	var cell_size = (graph_width - 12)/7;
	var tbl = d3.select("div#tables").append("table");
	var rows = tbl.selectAll("tr").data(data);
	rows.enter().append("tr");
	var cells = rows.selectAll("td")
		.data(function(d,i) {
			return d;
		}); 
	cells.enter().append("td")
		.style("background-color", function(d) { if(d==0) {return "rgb(49,163,84)"} else {return color(d)};})
		.classed("cell", true)
		.style("width", cell_size+'px')
		.style("height", cell_size+'px')

	// Adds days to top headers of all tables
	tbl.selectAll("th").data(days,function(d,i) { return d;}).enter().insert("th", "tr").classed("rotate", true).append("div").style("width", cell_size+'px').append("span").text(function(d) {return d;})
	return tbl;
}

var stationDict = {};
var marker;
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
		var colr = '#'+Math.random().toString(16).substr(-6);
		pline.addData({color: colr, width:4});
		map.addPolyline(pline);
		

	});
	// Draw markers last so they are above routes
	for (var stn in stationDict) {
		
		marker = new mxn.Marker(stationDict[stn]);
		marker.addData({"icon": "train20.png"});
		//marker.setShadowIcon('train20.png',48);
		map.addMarker(marker);
		//marker.icon.url = marker.iconShadowUrl;
		//marker.icon.url = 'train20.png';
	}

}

function getTrainOverview() {

	d3.json('trains.json', function(error, json) {
		
		var trains = json["trains"];
		var routes = json["routes"];
		var stations = json["stations"];
		var rowHeaders = [];

		trains.forEach(function(elem,idx) {
			rowHeaders.push(elem["name"]);
		});
		var newTbl = plotGridWithData(json["data"], rowHeaders);

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
				rowHeader.innerHTML = rowHeaders[counter];
				counter++;
				rowHeader.setAttribute("class", "rowHeader");
				curr_child.insertBefore(rowHeader, curr_child.childNodes[0])
			} 
		} 
		// Adds station names to headers on first table
		tables = d3.selectAll("table");
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
