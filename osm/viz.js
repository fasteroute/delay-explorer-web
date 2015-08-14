
var data;
var stations;
var periods;
var tbl;
var trains;
var color = d3.scale.quantize().range([
	"rgb(254,240,217)",
	"rgb(253,204,138)",
	"rgb(252,141,89)",
	"rgb(227,74,51)",
	"rgb(179,0,0)"]);
color.domain([0,20]);

d3.json('individual.json', function(error, json) {

	data = json["data"];
	stations = json["stations"];
	periods = json["days"];
	trains = json["trains"];
	var canvas_width = d3.select("div#viz").node().getBoundingClientRect().width
	var graph_width = canvas_width*0.5
	var cell_size = (graph_width - 12)/7;
	for (i=0; i<2; i++) {
		tbl = data[i];
		var rows = d3.select("div#viz").append("table")
		.selectAll("tr").data(tbl);
	rows.enter().append("tr");
	//rows.selectAll("th").data(stations, function(d) {return d;}).enter().append("th").text(function(d) {return d;})
	var cells = rows.selectAll("td")
		.data(function(d,i) {
			console.log(d); 
			return d;
		});
		cells.enter().append("td")
		.text(function(d) {return d;})
		.style("background-color", function(d) { if(d==0) {return "rgb(49,163,84)"} else {return color(d)};})
		.classed("cell", true)
		.style("width", cell_size+'px')
		.style("height", cell_size+'px')
		


	}
	d3.selectAll("table").selectAll("th").data(periods,function(d,i) { return d;}).enter().insert("th", "tr").classed("rotate", true).append("div").style("width", cell_size+'px').append("span").text(function(d) {return d;})
//d3.selectAll("th").append("br");

tables = d3.selectAll("table");
for (i=0; i<2; i++) { var current_table = tables[0][i]; var rowHeaderList; if (i == 0) {rowHeaderList=stations} else {rowHeaderList=trains}; var children = current_table.childNodes; var counter = 0; for (j=0; j<children.length; j++) { curr_child = children[j]; if (curr_child.tagName == "TR") { var rowHeader = document.createElement("th"); rowHeader.innerHTML = rowHeaderList[counter]; counter++; curr_child.insertBefore(rowHeader, curr_child.childNodes[0])} } }
});
