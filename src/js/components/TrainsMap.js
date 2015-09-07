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
      zoom: 12
    };
  },

  render: function() {
    var position = [this.state.lat, this.state.lng];
    return <LeafletMap center={position} zoom={this.state.zoom}>
      <TileLayer
        url='http://tile.stamen.com/toner/{z}/{x}/{y}.png'
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://maps.stamen.com">Stamen</a>'
      />
    </LeafletMap>;
 }

});

module.exports = TrainsMap;
