"use strict";

var Fluxxor = require('fluxxor');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var StationsStore = Fluxxor.createStore({

  initialize: function() {
    this.stations = [];
  
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
