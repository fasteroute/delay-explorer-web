"use strict";

var React = require('react');

var LeafletMap = require('react-leaflet').Map;
var Marker = require('react-leaflet').Marker;
var Popup = require('react-leaflet').Popup;
var TileLayer = require('react-leaflet').TileLayer;

var TrainsMap = React.createClass({
  getInitialState: function() {
    return {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  },

  render: function() {
    var position = [this.state.lat, this.state.lng];
    return <LeafletMap center={position} zoom={this.state.zoom}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
        </Popup>
      </Marker>
    </LeafletMap>;
 }

});

module.exports = TrainsMap;
