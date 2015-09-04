"use strict";

var React = require('react');

var StateMixin = require('react-router').State;
var FluxMixin = require('fluxxor').FluxMixin(React);

var TrainInputs = require('./TrainInputs');
var TrainsGrid = require('./TrainsGrid');

var TrainExplorer = React.createClass({
  mixins: [FluxMixin, StateMixin],

  componentWillMount: function() {
    this.triggerDataLoad(this.props.params.from, this.props.params.to, this.props.params.type, this.props.params.time);  
  },

  componentWillReceiveProps: function(nextProps) {
    this.triggerDataLoad(nextProps.params.from, nextProps.params.to, nextProps.params.type, nextProps.params.time);
  },

  triggerDataLoad: function(from, to, type, time) {
    this.getFlux().actions.loadTrainExplorer(from, to, type, time);
  },

  render: function() {

    var from = null;
    var to = null;
    var type = null;
    var time = null;
    var trainId = null;
    var shouldIncludeTrainsGrid = false;
    if (this.props.params.from != null) {
      from = this.props.params.from;
      shouldIncludeTrainsGrid = true;
    }
    if (this.props.params.to != null) {
      to = this.props.params.to;
    }
    if (this.props.params.type != null) {
      type = this.props.params.type;
    }
    if (this.props.params.time != null) {
      time = this.props.params.time;
    }
    if (this.props.params.trainId != null) {
      trainId = this.props.params.trainId;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6" id="map-column">
            <h2>Map {this.props.params.from}</h2>
          </div>
          <div className="col-md-6" id="stuff-column">
            <TrainInputs from={from} to={to} type={type} time={time} />
            {shouldIncludeTrainsGrid ? <TrainsGrid from={from} to={to} type={type} time={time} trainId={trainId}/> : false}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TrainExplorer;
