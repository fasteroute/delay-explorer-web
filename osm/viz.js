//var svg = d3.select("div#viz").append("svg")
//	.attr("height", "100%")
//	.attr("width", "100%")

var data
var tbl;
d3.json('individual.json', function(error, json) {
	
	data = json;
	data.forEach( function(tb) {
		tbl = tb;
		var rows = d3.select("div#viz").append("table")
			.attr("width", "100%")
			.attr("height", "50%")
			.selectAll("tr").data(tbl);
		rows.enter().append("tr");
		var cells = rows.selectAll("td").data(function(d) {console.log(d); return d;})
		cells.enter().append("td")
			.text(function(d) {return d;})
			.style("background-color", function() { return '#'+Math.random().toString(16).substr(-6)})
			.classed("cell", true)

	})
	//var cell_size = (svg.node().getBoundingClientRect().width - 12)/7;
});
