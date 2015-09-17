"use strict";

var Fluxxor = require('fluxxor');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var StationsStore = Fluxxor.createStore({

  initialize: function() {
    this.stations = [];
    this.points = [];
    this.origin = "";
    this.destination = "";
    this.bindActions(
      TrainExplorerConstants.LOAD, this.onLoad,
      TrainExplorerConstants.LOAD_SUCCESS, this.onLoadSuccess,
      TrainExplorerConstants.LOAD_FAIL, this.onLoadFail
    );
  },

  onLoad: function() {
    this.loading = true;
    this.error = null;
    this.emit("change");
  },

  onLoadSuccess: function(payload) {
    this.loading = false;
    this.error = null;
    this.stations = payload.stations;
    this.origin = payload.origin_text ? payload.origin_text : "";
    this.destination = payload.destination_text ? payload.destination_text : "";
    this.points = [];
    for (var i = 0; i < this.stations.length; i++) {
      this.points.push([this.stations[i].lat, this.stations[i].lon]);
    }
    this.emit("change");

  },

  onLoadFail: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.stations = [];
    this.emit("change");
    this.origin = "";
    this.destination = "";
  }

});

module.exports = StationsStore;
