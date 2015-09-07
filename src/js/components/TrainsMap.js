"use strict";

// React
var React = require('react');

// Mixins
var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

// 3rd Party Components.
var LeafletMap = require('react-leaflet').Map;
var Marker = require('react-leaflet').Marker;
var Popup = require('react-leaflet').Popup;
var TileLayer = require('react-leaflet').TileLayer;

var TrainsMap = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('StationsStore')],

  getInitialState: function() {
    return {
      lat: 51.505,
      lng: -0.09,
      zoom: 12
    };
  },

  getStateFromFlux: function() {
    var stationsStore = this.getFlux().store('StationsStore');
    return {
      stations: stationsStore.stations 
    };
  },

  render: function() {
    var position = [this.state.lat, this.state.lng];
    return <LeafletMap center={position} zoom={this.state.zoom}>
      <TileLayer
        url='http://tile.stamen.com/toner/{z}/{x}/{y}.png'
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://maps.stamen.com">Stamen</a>'
      />
      {this.state.stations.map(function(station) {
        return (
          <Marker key={station.id} position={[station.lat, station.lon]}>
            <Popup>
              <h4>{station.name}</h4>
            </Popup>
          </Marker>
        );
      })}
    </LeafletMap>;
 }

});

module.exports = TrainsMap;
