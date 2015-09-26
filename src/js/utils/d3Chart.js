"use strict";

// With help from http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/

var d3 = require('d3');
var Palette = require('./Palette');
var d3Chart = {};

d3Chart.create = function(el, props, state) {
  this.props = props;

  var svg = d3.select(el).append("svg")
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.append('g')
    .attr('class', 'd3-canvas');

  this.update(el, state);

};


d3Chart.update = function(el, state) {

  this._drawHistogram(el, state);

};

d3Chart._drawHistogram = function(el, state) {
  var palette = [Palette.color(0), Palette.color(10), Palette.color(22), Palette.color(31), '#d03141'];
  var svg = d3.select(el).selectAll('.d3-canvas');
  var yScale = d3.scale.ordinal()
    .domain(state.domain)
    .rangeBands([0, this.props.height - 20], .1);
  var scales = {y: yScale};
  var bar = svg
    .selectAll("g")
    .data(state.data)
    .enter()
    .append("g")
    .attr("height", scales.y.rangeBand() / 0.9)
    .attr("transform", function(d) {
        return "translate(0," + scales.y(d.period) + ")";
    });

  var txt = bar.append("text")
  .text(function(d) { return d.period; })
  .attr("fill", "black")
  .attr("dy", ".4em")
  .attr("transform", "translate(0," + (scales.y.rangeBand() * 0.5) + ")");
  //.attr("y", ((scales.y.rangeBand()) / 2))

  // Find maximum width of yAxis text so we can add a reasonable offset
  var maxTxtLength = 0;
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

  scales.x = d3.scale.linear()
    .domain([0, 100])
    .range([maxTxtLength + 5, this.props.width - 12]);
  var rects = bar.append("rect")
    .attr("width", function(d) {
      return scales.x(d.percent) - (maxTxtLength + 5);
    })
    .attr("height", function(d) {
      return scales.y.rangeBand();
    })
    .attr('fill', function(d, i) {
      return palette[i];
    });
    maxTxtLength += 5;
  rects.attr("transform", "translate(" + maxTxtLength + ",0)");

  var xAxis = d3.svg.axis()
    .scale(scales.x)
    .ticks(5)
    .tickFormat(function(d) { return d + "%"; })
    .orient("bottom");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (this.props.height - 20) + ")")
    .call(xAxis);

};

d3Chart.destroy = function(el) {
  //d3.select(el).selectAll("g").remove();
};

module.exports = d3Chart;
