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

// Create random data for each area
//

var areas=["AB", "AL", "B", "BA", "BB", "BD", "BH", "BL", "BN", "BR", "BS", "BT", "CA", "CB", "CF", "CH", "CM", "CO", "CR", "CT", "CV", "CW", "DA", "DD", "DE", "DG", "DH", "DL", "DN", "DT", "DY", "E", "EC", "EH", "EN", "EX", "FK", "FY", "G", "GL", "GU", "HA", "HD", "HG", "HP", "HR", "HS", "HU", "HX", "IG", "IP", "IV", "KA", "KT", "KW", "KY", "L", "LA", "LD", "LE", "LL", "LN", "LS", "LU", "M", "ME", "MK", "ML", "N", "NE", "NG", "NN", "NP", "NR", "NW", "OL", "OX", "PA", "PE", "PH", "PL", "PO", "PR", "RG", "RH", "RM", "S", "SA", "SE", "SG", "SK", "SL", "SM", "SN", "SO", "SP", "SR", "SS", "ST", "SW", "SY", "TA", "TD", "TF", "TN", "TQ", "TR", "TS", "TW", "UB", "W", "WA", "WC", "WD", "WF", "WN", "WR", "WS", "WV", "YO", "ZE"];

var areadata={};

_.each(areas, function(a) {
//	areadata[a]=a.charCodeAt(0);
	areadata[a] = Math.random() * 40;
});

var color = d3.scale.quantize().range([
	"rgb(198,219,239)",
	"rgb(158,202,225)",
	"rgb(107,174,214)",
	"rgb(66,146,198)",
	"rgb(33,113,181)",
	"rgb(8,81,156)",
	"rgb(8,48,107)"]);
color.domain(d3.extent(_.toArray(areadata)));

var svg = d3.select("div#viz").append("svg")
	.attr("width", width)
	.attr("height", height);

d3.json("uk-postcode-area.json", function(error, uk) {
	svg.selectAll(".subunit")
		.data(topojson.feature(uk, uk.objects['uk-postcode-area']).features)
		.enter()
		.append("path")
		.attr("class", "postcode_area")
		.attr("d", path)
		.style("fill", function(d) {
			var value = areadata[d.id];

			if (value) {
				return color(value);
			} else {
				return "#AAA";
			}
		});
	// Add boundary detection using a topojson mesh

	svg.append("path")
		.datum(topojson.mesh(uk, uk.objects['uk-postcode-area'], function(a,b) { return a!==b;}))
		.attr("class", "mesh")
		.attr("d", path);
	d3.select(".mesh")
		.attr("fill", "none")
		.attr("stroke", "#fff")
		.attr("stroke-width", ".5px")
		.attr("stroke-linejoin", "round");
});


