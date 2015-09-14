"use strict";

// Stuff
var React = require('react');

var _ = require('lodash');

// Mixins
var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var Polyline = require('react-leaflet').Polyline;

var defaultLineColor = "blue";

var MapSegment = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('ActiveSegmentsStore')],

  getInitialState: function() {
    return {};
  },

  getStateFromFlux: function() {
    var activeSegmentsStore = this.getFlux().store('ActiveSegmentsStore');
    if (activeSegmentsStore.activeSegments[this.props.sid] === true) {
      return {selected: true};
    } else {
      return {selected: false};
    }
  },  

  componentWillMount: function() {
    var newState = {};
    newState.originLatLng = this.props.origin;
    newState.destinationLatLng = this.props.destination;
    if (newState.originLatLng !== undefined && newState.destinationLatLng !== undefined) {
      newState.valid = true;
    } else {
      newState.valid = false;
    }
    this.setState(newState);
  },

  componentWillReceiveProps: function(nextProps) {
    var newState = {};
    newState.originLatLng = nextProps.origin;
    newState.destinationLatLng = nextProps.destination;
    if (newState.originLatLng !== undefined && newState.destinationLatLng !== undefined) {
      newState.valid = true;
    } else {
      newState.valid = false;
    }
    this.setState(newState);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return (this.state.selected !== nextState.selected) || (this.state.valid !== nextState.valid);
  },

  render: function() {
    var key = "" + this.state.id + this.state.selected + this.state.valid;
    return (
      <div>
        {this.state.valid ?
          [<Polyline key={key + "border"} map={this.props.map} positions={[this.state.originLatLng, this.state.destinationLatLng]} opacity={0.7} color="white" weight={9} />,
          <Polyline key={key} map={this.props.map} positions={[this.state.originLatLng, this.state.destinationLatLng]} opacity={0.7} color={this.state.selected ? this.props.colour : defaultLineColor} />]
            : null}
      </div>
    );
  }

});

module.exports = MapSegment;
