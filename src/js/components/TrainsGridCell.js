"use strict";

var React = require('react');
var d3 = require('d3');
var Popover = require('react-bootstrap').Popover;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Chart = require('./Chart');
var Palette = require('../utils/Palette');
var TrainsGridCell = React.createClass({
  render: function() {

    var lateColor;
    if (this.props.lateness.average_lateness === 0.0) {
      lateColor = "green";
    } else {
      lateColor = Palette.color(this.props.lateness.average_lateness);
    }
    var timePeriod = "4 weeks";
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement='top' overlay={<Popover title={this.props.popoverTitle}><Chart data={this.props.lateness.histogram} /><small style={{ color: "grey"}}>Data gathered over last {timePeriod}</small></Popover>}>
        <td style={{ padding: "2px", width: "50px" }}>
          <div style={{ width: "48px", height: "50px", backgroundColor: lateColor}}>
         </div>
        </td>
      </OverlayTrigger>
    );

  }
});

module.exports = TrainsGridCell;
