"use strict";

var React = require('react/addons');
var AutoSuggest = require('react-autosuggest');
var NavigationMixin = require('react-router').Navigation;
var $ = require('jquery');
var ButtonInput = require('react-bootstrap').ButtonInput;
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;

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
  suggestions: function(input, callback) {
    console.log('searching for ' + input);
    $.getJSON('http://localhost:8080/Locations/' + encodeURIComponent(input), function(json) {
      callback(null, json.locations);
    })
    .fail( function() {
      callback(new Error("Couldn't get autocomplete"));
    });

  },
  suggestionRenderer: function(suggestion, input) {
    return (
      <div className="row">
        <div className="col-sm-1">
          <img src="/img/nr.png"/>
        </div>
        <div className="col-sm-11">
          <span>{ suggestion.name + " [" + suggestion.user_code + "]"}</span>
        </div>
      </div>
    );
  },
  suggestionValue: function(suggestionObj) {
    return suggestionObj.name + " [" + suggestionObj.user_code + "]";
  },
  onOriginSelected: function(suggestion, event) {
    event.preventDefault();
    if (suggestion !== null) {
      this.setState({from: suggestion.user_code});
    }
  },
  onDestinationSelected: function(suggestion, event) {
    event.preventDefault();
    if (suggestion !== null) {
      this.setState({to: suggestion.user_code});
    }
  },
  render: function() {
    console.log("Rendering TrainInputs.");
    return (
      <div className="section" id="start">
        <Panel className="InputsPanel">
          <form className="form-horizontal">
             <div className="form-group">
               <label className="control-label col-sm-1" htmlFor='originAutoSuggest'>From</label>
               <AutoSuggest suggestions={this.suggestions}
                     suggestionRenderer={this.suggestionRenderer}
                     suggestionValue={this.suggestionValue}
                     onSuggestionSelected={this.onOriginSelected}
                     inputAttributes={{ className: "col-sm-12 form-control", placeholder: "London Bridge", id: "originAutoSuggest"}}/>
            </div>
            <div className="form-group">
               <label className="control-label col-sm-1" htmlFor='originAutoSuggest'>To</label>
               <AutoSuggest suggestions={this.suggestions}
                     suggestionRenderer={this.suggestionRenderer}
                     suggestionValue={this.suggestionValue}
                     onSuggestionSelected={this.onDestinationSelected}
                     inputAttributes={{ className: "col-sm-12 form-control", placeholder: "East Croydon", id: "originAutoSuggest"}}/>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <Input type="select"
                       ref="typeInput"
                       label="Type"
                       valueLink={this.linkState('type')}
                       labelClassName="col-sm-3"
                       wrapperClassName="col-sm-9">
                  <option value="weekdays">Week Days</option>
                  <option value="weekends">Week Ends</option>
                </Input>
              </div>
              <div className="col-xs-3">
                <Input type="text"
                       ref="timeInput"
                       label="Time"
                       valueLink={this.linkState('time')}
                       placeholder="10:00"
                       labelClassName="col-sm-4"
                       wrapperClassName="col-sm-8"/>
              </div>
              <div className="col-xs-4 col-xs-offset-1">
                  <ButtonInput wrapperClassName="col-sm-6 btn-block" style={{width: "100%"}} type="submit" onClick={this.handleSubmit}>Find Trains</ButtonInput>
              </div>
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
