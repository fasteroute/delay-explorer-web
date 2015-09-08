"use strict";

var Fluxxor = require('fluxxor');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var SegmentsStore = Fluxxor.createStore({

  initialize: function() {
    this.segments = [];

    this.bindActions(
      TrainExplorerConstants.LOAD, this.onLoad,
      TrainExplorerConstants.LOAD_SUCCESS, this.onLoadSuccess,
      TrainExplorerConstants.LOAD_FAIL, this.onLoadFail,
      TrainExplorerConstants.UPDATE_ROUTE, this.updateRoute
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
    this.segments = payload.segments.map( function(segment) {
      segment.colour = "red";
      segment.selected = false;
      return segment;
    });
    this.emit("change");
  },

  onLoadFail: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },
  updateRoute: function(routeID) {
    var len = this.segments.length;
    console.log("Starting loop");
    if (routeID === null) {
      for (var i = 0; i < len; i++) {
        this.segments[i].selected = false;
      }
    } else {

      for (var i = 0; i < len; i++) {
        var routesLen = this.segments[i].routes.length;
        for (var j = 0; j < routesLen; j++) {
          if (routeID === this.segments[i].routes[j]) {
            this.segments[i].selected = true;
            console.log("segment " + this.segments[i].origin + "->" + this.segments[i].destination + " updated");
            console.log(this.segments[i], this.segments[i].selected);
          }
        }
      }


    }
    console.log("Ending loop");
    this.emit("change");
  }

});

module.exports = SegmentsStore;
