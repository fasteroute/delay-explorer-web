"use strict";

var React = require('react');
var d3 = require('d3');
var Popover = require('react-bootstrap').Popover;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Chart = require('./Chart');
var color = d3.scale.quantize().range([
  "rgb(253,204,138)",
  "rgb(252,141,89)",
  "rgb(227,74,51)",
  "rgb(179,0,0)"]);
color.domain([0, 30]);

var TrainsGridCell = React.createClass({
  render: function() {

    var lateColor;
    if (this.props.lateness.average_lateness === 0.0) {
      lateColor = "green";
    } else {
      lateColor = color(this.props.lateness.average_lateness);
    }
    var timePeriod = "4 weeks";
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement='top' overlay={<Popover title={"Trains over the last " + timePeriod}><Chart data={this.props.lateness.histogram} /></Popover>}>
        <td style={{ padding: "2px" }}>
          <div style={{ width: "48px", height: "50px", backgroundColor: lateColor}}>
         </div>
        </td>
      </OverlayTrigger>
    );

  }
});

module.exports = TrainsGridCell;
