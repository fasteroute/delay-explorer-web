"use strict";

var React = require('react');

var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var CallingPointsGrid = require('./CallingPointsGrid');

var Alert = require('react-bootstrap').Alert;
var Panel = require('react-bootstrap').Panel;

var panelTitle = (<h3>Trains Grid</h3>);

var TrainsGrid = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('SegmentsStore', 'RoutesStore')],

  getInitialState: function() {
    return {
    };
  },

  getStateFromFlux: function() {
    var routesStore = this.getFlux().store('RoutesStore');
    var segmentsStore = this.getFlux().store('SegmentsStore');
    return {
      loading: routesStore.loading,
      error: routesStore.error,
      routes: routesStore.routes,
      segments: segmentsStore.segments
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
        <h3>Routes</h3>
        {this.state.routes.map(function(route) {
          return <p>route</p>;
        })}
        <h3>Segments</h3>
        {this.state.segments.map(function(segment) {
          return <p>segment</p>;
        })}
        {shouldIncludeCallingPointsGrid ? <CallingPointsGrid/> : false}
      </Panel>
    );
  }

});

module.exports = TrainsGrid;
