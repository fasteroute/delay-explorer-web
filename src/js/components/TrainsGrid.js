"use strict";

var React = require('react');

var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var TrainsGridRow = require('./TrainsGridRow');
var CallingPointsGrid = require('./CallingPointsGrid');

var Alert = require('react-bootstrap').Alert;
var Panel = require('react-bootstrap').Panel;

var panelTitle = (<h3>Trains Grid</h3>);

var TrainsGrid = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('SegmentsStore', 'RoutesStore', 'StationsStore', 'TrainsStore')],

  getInitialState: function() {
    return {
    };
  },

  getStateFromFlux: function() {
    var routesStore = this.getFlux().store('RoutesStore');
    var segmentsStore = this.getFlux().store('SegmentsStore');
    var stationsStore = this.getFlux().store('StationsStore');
    var trainsStore = this.getFlux().store('TrainsStore');
    return {
      loading: routesStore.loading,
      error: routesStore.error,
      routes: routesStore.routes,
      segments: segmentsStore.segments,
      stations: stationsStore.stations,
      trains: trainsStore.trains
    };
  },

  render: function() {
    var shouldIncludeCallingPointsGrid = false;
    if (this.props.trainId != null) {
      shouldIncludeCallingPointsGrid = true;
    }
    return (
      <Panel header={panelTitle}>
        {this.state.loading ? <Alert bsStyle="primary">Loading Data...</Alert> : null}
        {this.state.error ? <Alert bsStyle="danger">{this.state.error}</Alert> : null}
        <table>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span></span></div></th>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}>M</div></th>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>T</span></div></th>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>W</span></div></th>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>T</span></div></th>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>F</span></div></th>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>S</span></div></th>
          <th><div style={{width: "50px", textAlign: "center", margin: "auto"}}><span>S</span></div></th>
          {this.state.trains.map(function(train) {
            return <TrainsGridRow key={train.id} train={train}/>;
          })}
        </table>
        {shouldIncludeCallingPointsGrid ? <CallingPointsGrid/> : false}
      </Panel>
    );
  }

});

module.exports = TrainsGrid;
