"use strict";

var React = require('react');
var d3 = require('d3');
var Popover = require('react-bootstrap').Popover;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Chart = require('./Chart');
var Palette = require('../utils/Palette');
var TrainsGridCell = React.createClass({
  render: function() {

    var timePeriod = this.props.timePeriod;
    var lateColor;
    if (this.props.lateness === null ) {
      lateColor = "#b5b5b5"; // grey
      return (
        <OverlayTrigger trigger={['hover', 'focus']} placement='top' overlay={<Popover title={this.props.popoverTitle}><p>This train does not run on this day</p><p className="small">{timePeriod}</p></Popover>}>
          <td className="trains-grid-cell-outer-block">
            <div className="trains-grid-cell-inner-block" style={{backgroundColor: lateColor}}>
           </div>
          </td>
        </OverlayTrigger>
      );
    } else {
      lateColor = Palette.color(this.props.lateness.average_lateness);
    }
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement='top' overlay={<Popover title={this.props.popoverTitle}><Chart data={this.props.lateness.histogram} /><p className="small">{timePeriod}</p></Popover>}>
        <td className="trains-grid-cell-outer-block">
          <div className="trains-grid-cell-inner-block" style={{backgroundColor: lateColor}}>
         </div>
        </td>
      </OverlayTrigger>
    );

  }
});

module.exports = TrainsGridCell;
