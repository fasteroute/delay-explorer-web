"use strict";

var Fluxxor = require('fluxxor');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var SegmentsStore = Fluxxor.createStore({

  initialize: function() {
    this.segments = [];
  
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
    this.segments = payload.segments;
    this.emit("change");
  },

  onLoadFail: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  }

});

module.exports = SegmentsStore;
