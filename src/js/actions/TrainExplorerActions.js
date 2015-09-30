"use strict";

var $ = require('jquery');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var TrainExplorerActions = {
  loadTrainExplorer: function(fromCrs, toCrs, typeOfDays, time) {
    if (fromCrs === undefined && toCrs === undefined) {
      this.dispatch(TrainExplorerConstants.LOAD);
      return;
    }
    this.dispatch(TrainExplorerConstants.LOAD);
    console.log("Starting request to API server.");
    $.ajax({
      url: "http://localhost:5000/TrainExplorer/" + fromCrs + "/" + toCrs + "/" + typeOfDays + "/" + time,
      //url: "/data.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.dispatch(TrainExplorerConstants.LOAD_SUCCESS, data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        this.dispatch(TrainExplorerConstants.LOAD_FAIL, {error: err});
      }.bind(this)
    });
  },
  loadCallingPoints: function(trainID) {
    if (trainID === null) {
      this.dispatch(TrainExplorerConstants.CALLING_POINTS_LOAD_SUCCESS, { train: null, callingPoints: [] });
      return;
    }
    var trainIDCode = trainID[0];
    var origin = trainID[1];
    var dest = trainID[2];
    console.log("this.dispatch(TrainExplorerConstants.LOAD_CALLING_POINTS);");
    this.dispatch(TrainExplorerConstants.CALLING_POINTS_LOAD, trainIDCode);
    console.log("Starting request to API server for calling points.");
    $.ajax({
      url: "http://localhost:5000/CallingPoints/" + origin + "/" + dest + "/" + trainIDCode,
      dataType: 'json',
      cache: false,
      success: function(data) {
        data[trainIDCode].train = trainIDCode;
        this.dispatch(TrainExplorerConstants.CALLING_POINTS_LOAD_SUCCESS, data[trainIDCode]);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        this.dispatch(TrainExplorerConstants.CALLING_POINTS_LOAD_FAIL, {error: err});
      }.bind(this)
    });
  },
  updateRoute: function(routeID) {
    this.dispatch(TrainExplorerConstants.UPDATE_ROUTE, routeID);
  }
};

module.exports = TrainExplorerActions;
