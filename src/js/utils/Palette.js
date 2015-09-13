"use strict";

var d3 = require('d3');

var Palette = {};

Palette.color = function(val) {
    var colour = d3.scale.quantize().range([
    "#ffffff",
    "#dddddd",
    "#bbbbbb",
    "#999999",
    "#777777",
    "#666666",
    "#555555",
    "#444444",
    "#333333",
    "#000000"])
    .domain([0, 40]);
    return colour(val);
  };

module.exports = Palette;
