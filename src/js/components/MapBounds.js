"use strict";

// Stuff
var React = require('react');

var _ = require('lodash');

// Mixins
var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

// 3rd Party Components.
var LeafletMap = require('react-leaflet').Map;
var L = require('leaflet');


var MapBounds = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('StationsStore')],

  getStateFromFlux: function() {
    var stationsStore = this.getFlux().store('StationsStore');
    return {
      stationsPoints: stationsStore.points
    };
  },

  render: function() {
    { this.state.stationsPoints.length > 1 ? this.props.map.fitBounds(this.state.stationsPoints) : null };
    return <span></span>;
 }

});

module.exports = MapBounds;
