
var d3 = require('d3');
var $ = require('jQuery');
/**
 * barGraph() creates a horizontal percentage histogram
 * and returns the text of the generated SVG xml.
 *
 * @param {function} callback
 * @param {[histogramObject]} histogram
 *
 */
var barGraph = function(histogram) {

var detailSVG = d3.select("svg#dayDetailGraph");

detailSVG.selectAll("g").remove();

var width = d3.select("div#dayDetail").node().getBoundingClientRect().width;
var containerHeight = d3.select("#dayDetail").node().getBoundingClientRect().height;
var height = containerHeight - 20;
var timePeriods = histogram.map(function(obj) { return obj.period; });

d3.select("#dayDetail").style("height", containerHeight+"px");
detailSVG
  .attr("width", width)
  .attr("height", height + 20);
var yScale = d3.scale.ordinal()
  .domain(timePeriods)
  .rangeBands([0,height], .1) 
var bar = detailSVG
  .selectAll("g")
  .data(histogram)
  .enter()
  .append("g")
  .attr("transform", function(d) {
    return "translate(0,"+yScale(d.period)+")";
  });
var txt = bar.append("text")
  .text(function(d) { return d.period; })
  .attr("transform", "translate(0,"+yScale.rangeBand()/2+")")
  .attr("fill","black");

// Find maximum width of yAxis text so we can add a reasonable offset
var maxTxtLength=0;
txt[0].forEach(function(node, inx) {
  if (node == null) {
    console.log('node was null');
    return;
  }
  var ndWth = node.getBoundingClientRect().width;
  if (maxTxtLength < ndWth) {
    maxTxtLength = ndWth;
  }
});

var xScale = d3.scale.linear()
  .domain([0,100])
  .range([maxTxtLength+5,width-10])
var rects = bar.append("rect")
  .attr("width", function(d) {
    return xScale(d.percent) - (maxTxtLength + 5);
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
  .call(xAxis);

var svgHTML = $('<div>').append($(detailSVG.node()).clone()).html()
return svgHTML;
}

module.exports = barGraph;
