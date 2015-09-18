"use strict";

var Fluxxor = require('fluxxor');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var ActiveSegmentsStore = Fluxxor.createStore({

  initialize: function() {
    this.activeSegments = {};

  this.bindActions(
      TrainExplorerConstants.UPDATE_ROUTE, this.updateRoute
    );
  },

  updateRoute: function(routeIDs) {

    var segments = this.flux.store('SegmentsStore').segments;

    var len = segments.length;

    if (routeIDs.length === 0) {
      for (var i = 0; i < len; i++) {
        this.activeSegments = {};
      }
    } else {
      this.activeSegments = {};
      for (var idIndex = 0; idIndex < routeIDs.length; idIndex++) {
        for (i = 0; i < len; i++) {
          var routesLen = segments[i].routes.length;
          for (var j = 0; j < routesLen; j++) {
            if (routeIDs[idIndex] === segments[i].routes[j]) {
              this.activeSegments[segments[i].id] = true;
              //console.log("segment " + this.segments[i].origin + "->" + this.segments[i].destination + " updated");
              //console.log(this.segments[i], this.segments[i].selected);
            }
          }
        }
      }
    }
    this.emit("change");
  }

});

module.exports = ActiveSegmentsStore;
