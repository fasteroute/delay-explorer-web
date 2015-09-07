"use strict";

// Stuff
var React = require('react');

var _ = require('lodash');

var Polyline = require('react-leaflet').Polyline;

var MapSegment = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
    this.state.originLatLng = this.props.origin;
    this.state.destinationLatLng = this.props.destination;
    if (this.state.originLatLng !== undefined && this.state.destinationLatLng !== undefined) {
      this.state.valid = true;
      console.log("Valid component");
    } else {
      this.state.valid = false;
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.state.originLatLng = nextProps.origin;
    this.state.destinationLatLng = nextProps.destination;
    if (this.state.originLatLng !== undefined && this.state.destinationLatLng !== undefined) {
      this.state.valid = true;
      console.log("Valid component");
    } else {
      this.state.valid = false;
    }
  },

  render: function() {
    return (
      <div>
        {this.state.valid ? <Polyline map={this.props.map} positions={[this.state.originLatLng, this.state.destinationLatLng]}/> : null}
      </div>
    );
  }

});

module.exports = MapSegment;   
