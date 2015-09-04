"use strict";

var React = require('react/addons');

var NavigationMixin = require('react-router').Navigation;

var ButtonInput = require('react-bootstrap').ButtonInput;
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;

var panelTitle = (<h3>Describe Train</h3>);

var TrainInputs = React.createClass({
  mixins: [NavigationMixin, React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
    // Move the props from the router into the state for this component.
    this.state.from = this.props.from;
    this.state.to = this.props.to;
    this.state.type = this.props.type;
    this.state.time = this.props.time;
  },

  render: function() {
    console.log("Rendering TrainInputs.");
    return (
      <div className="section" id="start">
        <Panel header={panelTitle}>
          <form className="form-horizontal">
            <Input type="text"
                   ref="fromInput"
                   label="From"
                   valueLink={this.linkState('from')}
                   placeholder="London Bridge"
                   labelClassName="col-sm-1"
                   wrapperClassName="col-sm-11"/>
            <Input type="text"
                   ref="toInput"
                   label="To"
                   valueLink={this.linkState('to')}
                   placeholder="East Croydon"
                   labelClassName="col-sm-1"
                   wrapperClassName="col-sm-11"/>
            <div className="row">
              <div className="col-xs-6">
                <Input type="select"
                       ref="typeInput"
                       label="Type"
                       valueLink={this.linkState('type')}
                       labelClassName="col-sm-2"
                       wrapperClassName="col-sm-10">
                  <option value="weekdays">Week Days</option>
                  <option value="weekends">Week Ends</option>
                </Input>
              </div>
              <div className="col-xs-6">
                <Input type="text"
                       ref="timeInput"
                       label="Time"
                       valueLink={this.linkState('time')}
                       placeholder="10:00"
                       labelClassName="col-sm-2"
                       wrapperClassName="col-sm-10"/>
              </div>
            </div>
            <div className="pull-right">
              <ButtonInput type="submit" bsSize="large" onClick={this.handleSubmit}>Find Trains</ButtonInput>
            </div>
          </form>
        </Panel>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var fromInput = this.refs.fromInput.getValue();
    var toInput = this.refs.toInput.getValue();
    var typeInput = this.refs.typeInput.getValue();
    var timeInput = this.refs.timeInput.getValue();
    console.log(fromInput + " " + toInput + " " + typeInput + " " + timeInput + " ");
    this.transitionTo('trainsGrid', {from: fromInput, to: toInput, type: typeInput, time: timeInput});
  },

  componentWillReceiveProps: function(nextProps) {
    // Received new props from the router. Need to update the state of the component.
    this.state.from = nextProps.from;
    this.state.to = nextProps.to;
    this.state.type = nextProps.type;
    this.state.time = nextProps.time;
  }

});

module.exports = TrainInputs;
