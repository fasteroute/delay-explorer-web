"use strict";

// Stuff
var React = require('react');

var _ = require('lodash');

// Mixins
var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

// 3rd Party Components.
var LeafletMap = require('react-leaflet').Map;
var Rectangle = require('react-leaflet').Rectangle;
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
    var stationBounds;
    var mapBounds;
    { if (this.state.stationsPoints.length > 1) {
        stationBounds = L.latLngBounds(this.state.stationsPoints);
        var boundsWidth = stationBounds.getEast() - stationBounds.getWest();

        var SE = stationBounds.getSouthEast();
        var NW = stationBounds.getNorthWest();
        // Adjust east bounds by station width to ensure the right column is empty

        SE.lng = SE.lng + boundsWidth;

        mapBounds = L.latLngBounds([SE, NW]);
        this.props.map.fitBounds(mapBounds);
      }
        return <span></span>;
    }
 }

});

module.exports = MapBounds;
