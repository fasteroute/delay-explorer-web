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

  updateRoute: function(routeID) {

    var segments = this.flux.store('SegmentsStore').segments;

    var len = segments.length;
    
    if (routeID === null) {
      for (var i = 0; i < len; i++) {
        this.activeSegments = {};
      }
    } else {
      this.activeSegments = {};
      for (i = 0; i < len; i++) {
        var routesLen = segments[i].routes.length;
        for (var j = 0; j < routesLen; j++) {
          if (routeID === segments[i].routes[j]) {
            this.activeSegments[segments[i].id] = true;
            //console.log("segment " + this.segments[i].origin + "->" + this.segments[i].destination + " updated");
            //console.log(this.segments[i], this.segments[i].selected);
          }
        }
      }

    }
    this.emit("change");
  }

});

module.exports = ActiveSegmentsStore;
