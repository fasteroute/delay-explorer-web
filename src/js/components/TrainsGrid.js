"use strict";

var React = require('react');

var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var StateMixin = require('react-router').State;

var TrainsGridRow = require('./TrainsGridRow');
var CallingPointsGrid = require('./CallingPointsGrid');

var Alert = require('react-bootstrap').Alert;
var Panel = require('react-bootstrap').Panel;


var TrainsGrid = React.createClass({

  mixins: [
    FluxMixin,
    StoreWatchMixin('SegmentsStore', 'RoutesStore', 'StationsStore', 'TrainsStore', 'CallingPointsStore'),
    StateMixin
  ],

  getInitialState: function() {
    return {
    };
  },

  getStateFromFlux: function() {
    var routesStore = this.getFlux().store('RoutesStore');
    var segmentsStore = this.getFlux().store('SegmentsStore');
    var stationsStore = this.getFlux().store('StationsStore');
    var trainsStore = this.getFlux().store('TrainsStore');
    var callingPointsStore = this.getFlux().store('CallingPointsStore');
    return {
      loading: routesStore.loading,
      error: routesStore.error,
      routes: routesStore.routes,
      segments: segmentsStore.segments,
      stations: stationsStore.stations,
      trains: trainsStore.trains,
      callingPoints: callingPointsStore.callingPoints,
      callingPointTrain: callingPointsStore.train,
      callingPointLoading: callingPointsStore.loading,
      callingPointLoaded: callingPointsStore.loaded
    };
  },

  render: function() {
    var shouldIncludeCallingPointsGrid = false;
    if (this.state.callingPointTrain !== null) {
      shouldIncludeCallingPointsGrid = true;
    }
    var externalScope = this;
    var alertBox = this.state.callingPointLoading ? <tr><td colSpan="8"><Alert bsStyle="info" style={{ textAlign: "center" }}>Loading Data...</Alert></td></tr> : null;
    var limitationsBox = this.state.trains.length == 0 ? <tr><td colSpan="8"><Alert bsStyle="warning" style={{ textAlign: "center" }}>We can't show you what you're looking for. To understand more about the limitations of our application click <u>here</u></Alert></td></tr> : null;

    if (limitationsBox !== null || this.state.error) {
      return (
      <Panel className="TrainsPanel">
        {this.state.error ? <Alert bsStyle="danger">Something has gone wrong! Error: {this.state.error}</Alert> : null}
        {limitationsBox}
      </Panel>
      );
    }
    return (
      <Panel className="TrainsPanel">
        {this.state.loading ? <Alert bsStyle="info">Loading Data...</Alert> : null}
        <table style={{width: "100%"}}>
          <thead>
            <th><div style={{textAlign: "center", margin: "auto"}}><span></span></div></th>
            <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>M</span></div></th>
            <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>T</span></div></th>
            <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>W</span></div></th>
            <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>T</span></div></th>
            <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>F</span></div></th>
            <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>S</span></div></th>
            <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>S</span></div></th>
          </thead>
          <tbody>
            {this.state.trains.map(function(train) {

              if (train.id === externalScope.state.callingPointTrain) {
                if (externalScope.state.callingPointLoading) {
                  return [
                    <TrainsGridRow key={train.id} train={train} isSelected={true} popoverTitle={train.name}/>,
                    alertBox
                  ];
                } else if (externalScope.state.callingPointLoaded) {
                  return [
                    <TrainsGridRow key={train.id} train={train} isSelected={true} popoverTitle={train.name}/>,
                    <tr>
                    <td colSpan="8">
                    <CallingPointsGrid key={train.id + "callingPointsGrid"} train={train} callingPoints={externalScope.state.callingPoints} trainID={train.id} />
                    </td>
                    </tr>
                  ];
                } else {
                  return <TrainsGridRow key={train.id} train={train} isSelected={false} popoverTitle={train.name}/>;
                }
              } else {
                return <TrainsGridRow key={train.id} train={train} isSelected={false} popoverTitle={train.name}/>;
              }
            })}
          </tbody>
        </table>
      </Panel>
    );
  }

});

module.exports = TrainsGrid;
