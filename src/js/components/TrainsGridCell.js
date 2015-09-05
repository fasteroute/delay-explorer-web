"use strict";

var React = require('react');
var d3 = require('d3');
var color = d3.scale.quantize().range([
  "rgb(253,204,138)",
  "rgb(252,141,89)",
  "rgb(227,74,51)",
  "rgb(179,0,0)"]);
color.domain([0, 30]);
console.log(color);

var TrainsGridCell = React.createClass({
  render: function() {

    var lateColor;
    if (this.props.lateness.average_lateness === 0.0) {
      lateColor = "green";
    } else {
      lateColor = color(this.props.lateness.average_lateness);
    }
    return (
      <td style={{ padding: "5px" }}>
        <div style={{ borderRadius: "25%", width: "50px", height: "50px", backgroundColor: lateColor }}>
       </div>
      </td>
    );
  }

});

module.exports = TrainsGridCell;
