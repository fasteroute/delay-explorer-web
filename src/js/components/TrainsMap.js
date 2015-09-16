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
var Marker = require('react-leaflet').Marker;
var Polyline = require('react-leaflet').Polyline;
var Popup = require('react-leaflet').Popup;
var TileLayer = require('react-leaflet').TileLayer;

// Components
var MapSegment = require('./MapSegment.js');
var MapBounds = require('./MapBounds');

//var tilesUrl = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
var tilesUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var pinIcon = L.icon({
    iconUrl: 'pin.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42]
});

var TrainsMap = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('SegmentsStore', 'StationsStore')],

  getInitialState: function() {
    return {
      lat: 51.505,
      lng: -0.09,
      zoom: 12
    };
  },

  getStateFromFlux: function() {
    var segmentsStore = this.getFlux().store('SegmentsStore');
    var stationsStore = this.getFlux().store('StationsStore');
    return {
      segments: segmentsStore.segments,
      stations: stationsStore.stations,
      stationsPoints: stationsStore.points
    };
  },

  getLatLngForStationId: function(stationId) {
    var s = _.find(this.state.stations, function(station) {
      return station.id === stationId;
    });
    if (s === undefined) {
      return undefined;
    }
    return [s.lat, s.lon];
  },

  render: function() {
    var position = [this.state.lat, this.state.lng];
    var actuallyThis = this;
    return <LeafletMap center={position} zoom={this.state.zoom}>
      <TileLayer
        url={tilesUrl}
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      />
      <MapBounds />
      {this.state.stations.map(function(station) {
        return (
          <Marker key={station.id} icon={pinIcon} position={[station.lat, station.lon]}>
            <Popup>
              <h4>{station.name}</h4>
            </Popup>
          </Marker>
        );
      })}
      {this.state.segments.map(function(segment) {
        return (
          <MapSegment key={segment.id} sid={segment.id} origin={actuallyThis.getLatLngForStationId(segment.origin)} destination={actuallyThis.getLatLngForStationId(segment.destination)} colour={segment.colour}/>
        );
      })}
    </LeafletMap>;
 }

});

module.exports = TrainsMap;
