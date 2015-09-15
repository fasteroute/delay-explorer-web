"use strict";

var Fluxxor = require('fluxxor');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var StationsStore = Fluxxor.createStore({

  initialize: function() {
    this.stations = [];
    this.points = [];
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
  }

});

module.exports = StationsStore;
