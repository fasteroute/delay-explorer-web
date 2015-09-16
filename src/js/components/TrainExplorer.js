"use strict";

var React = require('react');

var StateMixin = require('react-router').State;
var FluxMixin = require('fluxxor').FluxMixin(React);

var TrainInputs = require('./TrainInputs');
var TrainsGrid = require('./TrainsGrid');
var TrainsMap = require('./TrainsMap');

// Third Party

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var TrainExplorer = React.createClass({
  mixins: [FluxMixin, StateMixin],
  getInitialState: function() {
    if (this.props.params.to === undefined && this.props.params.from === undefined) {
      return {isInitialPage: true};
    } else {
      return {inInitialPage: false};
    }

  },
  componentWillMount: function() {
    this.triggerDataLoad(this.props.params.from, this.props.params.to, this.props.params.type, this.props.params.time);
  },

  componentWillReceiveProps: function(nextProps) {
    this.triggerDataLoad(nextProps.params.from, nextProps.params.to, nextProps.params.type, nextProps.params.time);
  },

  closeModal: function() {
    this.setState({isInitialPage: false});
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
    if (this.props.params.from !== null || this.props.params.from !== "_") {
      from = this.props.params.from;
      shouldIncludeTrainsGrid = true;
    }
    if (this.props.params.to !== null || this.props.params.to !== "_") {
      to = this.props.params.to;
      shouldIncludeTrainsGrid = true;
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

      <div>
        <Modal show={this.state.isInitialPage} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>UK Rail Reliability Explorer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ul>
            <li>Choose your starting station and/or your destination station</li>
            <li>Choose whether to travel on a weekday or at the weekend and the time</li>
            <li>Click 'Find trains'</li>
            <li>The grid shows the historical reliability of the trains</li>
            <li>Hover over for a more detailed history of past trains</li>
            <li>Click on a train to see how the delays develop along the route of the train</li>
          </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <TrainsMap/>
        <div className="container" id="main-container">
          <div className="row" id="over-map-row">
            <div className="col-md-6" id="left-column">
            </div>
            <div className="col-md-6" id="right-column">
              <TrainInputs from={from} to={to} type={type} time={time} />
              {shouldIncludeTrainsGrid ? <TrainsGrid from={from} to={to} type={type} time={time} trainId={trainId}/> : false}
            </div>
          </div>
        </div>
        <div id="attribution">
          <a href="http://www.nationalrail.co.uk"><img src="/img/Powered_by_NRE.png"/></a>
        </div>
      </div>
    );
  }

});

module.exports = TrainExplorer;
