var width = 960,
    height = 1160;

var projection = d3.geo.albers()
	.center([0, 55.4])
	.rotate([4.4, 0])
	.parallels([50, 50])
	.scale(1200*5)
	.translate([width/2, height/2]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("div#viz").append("svg")
	.attr("width", width)
	.attr("height", height);

d3.json("uk-postcode-area.json", function(error, uk) {
	svg.selectAll(".subunit")
		.data(topojson.feature(uk, uk.objects['uk-postcode-area']).features)
		.enter()
		.append("path")
		.attr("class", "feature")
		.attr("d", path);

});	
