"use strict";

var $ = require('jquery');

var TrainExplorerConstants = require('../constants/TrainExplorerConstants');

var TrainExplorerActions = {
  loadTrainExplorer: function(fromCrs, toCrs, typeOfDays, time) {
    this.dispatch(TrainExplorerConstants.LOAD);
    console.log("Starting request to API server.");
    $.ajax({
      url: "/data.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.dispatch(TrainExplorerConstants.LOAD_SUCCESS, data);
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        this.dispatch(TrainExplorerConstants.LOAD_FAIL, {error: err});
      }.bind(this)
    });
  }
};

module.exports = TrainExplorerActions;
