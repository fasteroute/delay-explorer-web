"use strict";

var Fluxxor = require('fluxxor');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var CallingPointsStore = Fluxxor.createStore({

  initialize: function() {
    this.callingPoints = [];
    this.train = null;
    this.bindActions(
      TrainExplorerConstants.CALLING_POINTS_LOAD, this.onLoad,
      TrainExplorerConstants.CALLING_POINTS_LOAD_SUCCESS, this.onLoadSuccess,
      TrainExplorerConstants.CALLING_POINTS_LOAD_FAIL, this.onLoadFail
    );
  },

  onLoad: function() {
    this.loading = true;
    this.error = null;
    console.log("calling points loading");
    this.emit("change");
  },

  onLoadSuccess: function(payload) {
    this.loading = false;
    this.error = null;
    this.callingPoints = payload.callingPoints;
    console.log("calling points load success");
    this.train = payload.train;
    this.emit("change");
  },

  onLoadFail: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.callingPoints = [];
    this.train = null;
    console.log("calling points load failed");
    this.emit("change");
  }

});

module.exports = CallingPointsStore;
